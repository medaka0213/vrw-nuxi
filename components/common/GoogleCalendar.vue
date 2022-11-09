<template>
<div class="googleCalendar">
  <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FTokyo&showTz=1&showNav=1&showTitle=1&mode=AGENDA&src=aW5vb3BkZW1pNmsydXNzMmxrdHJmbDBpdThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F09300" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
</div>
</template>

<style>
.googleCalendar iframe {
  width: 100%;
  height: 400px;
}
@media all and (min-width: 768px) {
  .googleCalendar iframe {
	height: 600px;
  }
}
</style>