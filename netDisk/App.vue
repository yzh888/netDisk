<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			console.log(this.$store.state.test);
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/*每个页面公共css */
	/* @import url("./common/uni.css"); */
	/* @import './common/iconfont.css'; */
	@import './common/icon.css';
	@import './common/icon-file.css';
	/* @import './common/animate.css'; */
	@import './common/free.css';
	@import './common/common.css';
	@import './common/uni.css';
</style>
