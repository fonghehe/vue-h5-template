import English from '@nutui/nutui/dist/packages/locale/lang/en-US';

/** NutUI 4 does not ship Japanese; keep the adapter typed against its locale. */
export default class Japanese extends English {
  override address = {
    selectRegion: '地域を選択',
    deliveryTo: '配送先',
    chooseAnotherAddress: '別の住所を選択',
  };
  override addresslist = { addAddress: '住所を追加', default: '既定' };
  override audiooperate = {
    back: '戻る',
    start: '再生',
    pause: '一時停止',
    forward: '進む',
    mute: 'ミュート',
  };
  override calendaritem = {
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    end: '終了',
    start: '開始',
    title: 'カレンダー',
    monthTitle: (year: number, month: number) => `${year}年${month}月`,
    today: '今日',
  };
  override calendarcard = { ...this.calendaritem };
  override cancel = 'キャンセル';
  override comment = {
    complaintsText: '報告する',
    additionalReview: (day: number) => `購入から${day}日後のレビュー`,
    additionalImages: (length: number) => `追加の画像：${length}枚`,
  };
  override confirm = '確認';
  override countdown = { day: '日', hour: '時間', minute: '分', second: '秒' };
  override datepicker = {
    year: '年',
    month: '月',
    day: '日',
    hour: '時',
    min: '分',
    seconds: '秒',
  };
  override done = '完了';
  override ecard = {
    chooseText: '選択',
    otherValueText: 'その他の金額',
    placeholder: '金額を入力',
  };
  override fixednav = {
    activeText: 'メニューを閉じる',
    unActiveText: 'メニューを開く',
  };
  override infiniteloading = {
    loading: '読み込み中…',
    pullTxt: '離して更新',
    loadMoreTxt: 'すべて読み込みました',
  };
  override noData = 'データがありません';
  override pagination = { prev: '前へ', next: '次へ' };
  override placeholder = '入力してください';
  override pullrefresh = {
    pulling: '下に引いて更新',
    loosing: '離して更新',
    loading: '更新中…',
    complete: '更新しました',
  };
  override save = '保存';
  override select = '選択';
  override shortpassword = {
    title: 'パスワードを入力',
    desc: '確認',
    tips: 'パスワードを忘れた場合',
  };
  override signature = {
    reSign: '書き直す',
    unSupportTpl: 'このブラウザーは署名に対応していません。',
  };
  override sku = {
    buyNow: '今すぐ購入',
    buyNumber: '数量',
    addToCart: 'カートに追加',
  };
  override skuheader = { skuId: '商品番号' };
  override timeselect = { pickupTime: '受取時間' };
  override uploader = {
    ready: '準備完了',
    readyUpload: 'アップロード準備完了',
    waitingUpload: 'アップロード待ち',
    uploading: 'アップロード中',
    success: 'アップロード完了',
    error: 'アップロード失敗',
  };
  override video = { errorTip: '再生できません', clickRetry: '再試行' };
}
