<script>
	import helper from 'common/helper.js'
	export default {
		onLaunch() {
			let key = uni.getStorageSync('cookie')
			uni.request({
				url: `${helper.url}/login/status`,
				// withCredentials: true,
				data: {
					cookie: key
				},
				success: (res) => {
					// console.log(res)
					uni.setStorageSync('id', res.data.data.account.id)
					let  id = res.data.data.account
					if(id) {
						this.$store.commit('changeLogin', true)
						this.getuser(key)
					}
				}
			})
		},
		methods: {
			getuser(key) {
				
				if(!key) {
					return
				}
				uni.request({
					url: `${helper.url}/user/account`,
					data:{
						cookie: key
					},
					success: (res) => {
						// console.log(res)
						let name = res.data.profile.nickname
						this.$store.commit('getusername', name)
						
						let id = res.data.profile.userId
						this.$store.commit('getuserid', id)
						let pic = res.data.profile.avatarUrl
						this.$store.commit('getuserheadpic', pic)
						this.userdetail(key, id)
					}
				})
			},
			userdetail(key, id) {
				uni.request({
					url: `${helper.url}/user/followeds?uid=${id}`,
					data:{
						cookie: key
					},
					success: (res) => {
						// console.log(res,2)
						let followeds = (res.data.followeds).length
						this.$store.commit('getfolloweds', followeds)
					}
				}),
				uni.request({
					url: `${helper.url}/user/follows?uid=${id}`,
					data: {
						cookie: key
					},
					success: (res) => {
						let follow = res.data.follow.length
						
						this.$store.commit('getfollow', follow)
					}
				})
			},
			watchmusice() {
				
				helper.audiok.onCanplay(() => {
					// 歌曲百分比长度
					this.$store.commit('changemusicePercentage', helper.audiok.duration / 100)
					// 分钟
					this.$store.commit('changemusiceminute', Math.floor((helper.audiok.duration) / 60))

					// 秒
					this.$store.commit('changemusicesecond', Math.floor((helper.audiok.duration) % 60))
				})

				helper.audiok.onTimeUpdate(() => {
					this.$store.commit('changemusiceProgress', helper.audiok.currentTime / this.$store.state.globalmusicePercentage)

					this.liveLine = this.$store.state.musiceProgress
					this.$store.commit('changemusiceplaylength', helper.audiok.currentTime)
					
				})

			}
		}
	}
</script>

<style>
	.daytime {}

	.night {
		/* --------- 首页-------- */
		/* // 背景 */
		--indexgbcolor: #151515;
		--indexiconbgcolor: #2c2c2c;
		--indexsearchbgcolor: #2f2f2d;

		/* // 字体 */
		--indexfontcolor: #fff;
		--zhuanshufontcolor: #fff;
		--liveboxfontcolor: #fefefe;


		/* // 边框颜色 */
		--bordercolor: #4a4a4a;

		/* // 加载更多按钮相关 */
		--btnbgcolor: #d0d0d0;
		--btnfontcolor: #7d7d7d;

		/* --------- 首页-------- */


		/* --------- 搜索页-------- */
		--topsearchbgcolor: #2c2c2c;




		/* --------- 搜索页-------- */
		/* --------- 搜索列表页-------- */
		--searchlistbgcolor: #141414;
		--searchlisttopbgcolor: #2c2c2c;
		--searchlistfontcolor: #a3a3a3;
		--searchlistinput: #959595;
		--listboxbgcolor: #2b2b2b;
		--listboxfontcolor: #fff;
		--listboxline: #3b3b3b;
		--listboxtextcolor: #567d9e;
		--listboxrowcolor: #cac6c7;
		/* --------- 搜索列表页-------- */




		/* --------- 历史播放列表页-------- */
		--historybgcolor: #151515;

		/* --------- 历史播放列表页-------- */
	}

	::-webkit-scrollbar {
		display: none;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.p {
		display: flex;
		/* flex-direction: column; */
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		color: rgba(255, 255, 255, .6);
		font-size: 14px;
		height: 60rpx;
		line-height: 40rpx;
		padding: 5px 0;
		font-weight: 500;
	}
</style>