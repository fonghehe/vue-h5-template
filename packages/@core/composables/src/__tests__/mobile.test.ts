/* eslint-disable vue/one-component-per-file -- inline harnesses keep lifecycle tests local. */
import type { Ref } from 'vue';

import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { useNetworkStatus } from '../use-network-status';
import { usePullToRefresh } from '../use-pull-to-refresh';
import { useVisualViewport } from '../use-visual-viewport';

const originalOnline = Object.getOwnPropertyDescriptor(navigator, 'onLine');
const originalViewport = Object.getOwnPropertyDescriptor(
  window,
  'visualViewport',
);

afterEach(() => {
  if (originalOnline)
    Object.defineProperty(navigator, 'onLine', originalOnline);
  if (originalViewport)
    Object.defineProperty(window, 'visualViewport', originalViewport);
  else Reflect.deleteProperty(window, 'visualViewport');
});

describe('mobile composables', () => {
  it('resets a short pull without requesting data', async () => {
    const onRefresh = vi.fn();
    const refresh = usePullToRefresh({ onRefresh });
    const element = document.createElement('section');
    const eventAt = (clientY: number) =>
      ({
        currentTarget: element,
        touches: [{ clientY }],
      }) as unknown as TouchEvent;
    refresh.onTouchStart(eventAt(10));
    refresh.onTouchMove(eventAt(30));
    await refresh.onTouchEnd();
    expect(onRefresh).not.toHaveBeenCalled();
    expect(refresh.distance.value).toBe(0);
    expect(refresh.ready.value).toBe(false);
  });

  it('clears refresh state when the request fails so the user can retry', async () => {
    const failure = new Error('offline');
    const onRefresh = vi
      .fn()
      .mockRejectedValueOnce(failure)
      .mockResolvedValueOnce(undefined);
    const refresh = usePullToRefresh({ onRefresh, threshold: 40 });
    const element = document.createElement('section');
    const eventAt = (clientY: number) =>
      ({
        currentTarget: element,
        touches: [{ clientY }],
      }) as unknown as TouchEvent;
    const pull = () => {
      refresh.onTouchStart(eventAt(0));
      refresh.onTouchMove(eventAt(200));
      return refresh.onTouchEnd();
    };
    await expect(pull()).rejects.toBe(failure);
    expect(refresh.refreshing.value).toBe(false);
    expect(refresh.distance.value).toBe(0);
    await pull();
    expect(onRefresh).toHaveBeenCalledTimes(2);
  });

  it('tracks browser online and offline events', async () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
    let isOnline: Readonly<Ref<boolean>> | undefined;
    const wrapper = mount(
      defineComponent({
        setup() {
          ({ isOnline } = useNetworkStatus());
          return () => h('div');
        },
      }),
    );

    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });
    window.dispatchEvent(new Event('offline'));
    await nextTick();

    expect(isOnline?.value).toBe(false);
    wrapper.unmount();
  });

  it('tracks VisualViewport resize and removes its listeners', async () => {
    const viewport = new EventTarget() as EventTarget & {
      height: number;
      offsetTop: number;
    };
    viewport.height = 640;
    viewport.offsetTop = 8;
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: viewport,
    });
    let viewportHeight: Readonly<Ref<number | undefined>> | undefined;
    const wrapper = mount(
      defineComponent({
        setup() {
          ({ viewportHeight } = useVisualViewport());
          return () => h('div');
        },
      }),
    );

    viewport.height = 420;
    viewport.dispatchEvent(new Event('resize'));
    await nextTick();

    expect(viewportHeight?.value).toBe(420);
    wrapper.unmount();
    viewport.height = 300;
    viewport.dispatchEvent(new Event('resize'));
    expect(viewportHeight?.value).toBe(420);
  });

  it('refreshes only after the pull threshold is reached', async () => {
    const onRefresh = vi.fn().mockResolvedValue(undefined);
    const element = document.createElement('section');
    const { distance, onTouchEnd, onTouchMove, onTouchStart, refreshing } =
      usePullToRefresh({ onRefresh, threshold: 50 });
    const eventAt = (clientY: number) =>
      ({
        currentTarget: element,
        touches: [{ clientY }],
      }) as unknown as TouchEvent;

    onTouchStart(eventAt(10));
    onTouchMove(eventAt(130));
    expect(distance.value).toBeGreaterThanOrEqual(50);

    const refresh = onTouchEnd();
    expect(refreshing.value).toBe(true);
    await refresh;

    expect(onRefresh).toHaveBeenCalledOnce();
    expect(refreshing.value).toBe(false);
    expect(distance.value).toBe(0);
  });
});
