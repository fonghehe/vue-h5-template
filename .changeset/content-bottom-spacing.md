---
'@vh5/mobile-ui': patch
---

Use a compact 20px content bottom gap instead of blanket 90/190px padding.
Reserve the measured checkout bar height only while the bar is mounted, and
let in-flow tabs or checkout bars own their bottom safe area without duplication.
