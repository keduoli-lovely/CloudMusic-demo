<template>
	<view class="playlist">
		<view class="box">
			<view class="box-top">
				<view class="keduoli1">
					<image :src="pic1" mode="aspectFill" class="minke"></image>
					<view class="kkkkk"
						style="width: 100%;height: 100%;background-color: rgba(0,0,0,.1);position: absolute;top: 0;left: 0;">

					</view>
				</view>
				<view class="callback-icon" @click="back">
					<image src="../../static/icon/系统返回2.png" mode="aspectFit"></image>
				</view>

				<view class="playicon" :style="`padding-bottom:${long}`">
					<view class="porup" v-show="range == false">
						<view class="icon">
							<image src="../../static/icon/音乐演奏.png" mode="aspectFit"></image>

						</view>
						<text class="t1">歌单</text>
					</view>

					<input type="text" name="sear" class="input" v-show="range === true" placeholder="搜索歌单内容歌曲"
						placeholder-style="color: rgba(255, 255, 255, .4);padding-bottom: 10rpx" v-model="title"
						auto-focus ref="focusk">

					<view class="clear" @click="textclear" v-if="title != null">
						<image src="/static/icon/关闭2.png" mode="aspectFit"></image>
					</view>
				</view>

				<view class="Searchlist" v-show="range === false">
					<view class="search" @click="find">
						<image src="../../static/icon/3.1-搜索.png" mode="aspectFit"></image>

					</view>

					<view class="alllist" @click.stop="showlist">
						<image src="../../static/icon/Android更多.png" mode="aspectFit" ref="main"></image>
					</view>

				</view>
			</view>


			<view class="playlistpic">
				<image :src="pic1" mode="aspectFill"></image>
				<view class="text">
					<view class="font">
						推荐歌单
					</view>
					<view class="t2">
						{{singname}}
					</view>
					<view class="t3">
						{{singtext}}
					</view>
				</view>
				<view class="songmask">

				</view>
			</view>

			<!-- 中间收藏,评论,分享功能 -->
			<view class="btnlist">
				<!-- 收藏 -->
				<view class="collection">
					<view class="icon1">
						<image src="../../static/icon/添加.png" mode="aspectFit"></image>
					</view>
					<text class="t4">{{watchnum1}}</text>万
				</view>

				<!-- 评论 -->
				<view class="comments">
					<view class="icon2">
						<image src="../../static/icon/评论.png" mode="aspectFit"></image>
					</view>
					<text class="t5">{{readnum}}</text>
				</view>

				<view class="give">
					<view class="icon3">
						<image src="../../static/icon/3.1分享.png" mode=""></image>
					</view>
					<text t6>{{givenum}}</text>
				</view>
			</view>


			<view class="playlistbottom">
				<view class="minbox">
					<view class="minbox-top">
						<view class="minboxplay-icon">
							<image src="../../static/icon/24gf-playCircle.png" mode="aspectFit"></image>
						</view>
						<view class="playtext">
							<text class="t6">播放全部</text>
							<text class="t8">{{'(' + listnum + ')'}}</text>
						</view>

						<view class="down">
							<view class="down-icon">
								<image src="../../static/icon/平台下载.png" mode="aspectFit"></image>
							</view>
							<view class="down-all">
								<image src="../../static/icon/多选.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>



					<!-- 音乐列表 -->

					<view class="musiclist">
						<view class="musicmin">
							<view class="music" v-for="(item, i) in songdata"
								@click="startgq(item.id,item.al.picUrl,item.name,item.ar[0].name)">
								<text class="top">{{i+1}}</text>

								<view class="content">
									<view class="title">
										{{item.name}}
									</view>
									<!-- 作者 -->
									<view class="author">
										{{item.ar[0].name}}
									</view>
								</view>

								<view class="row-right">
									<view class="play-mv" @click="getmv" v-if="item.mv">
										<image src="../../static/icon/播放4.png" mode="aspectFit"></image>
									</view>
									<view class="play-mv" style="border: 0" v-if="!item.mv">
									</view>
									<view class="row-all">
										<image src="/static/icon/更多2.png" mode="aspectFit"></image>
									</view>
								</view>
							</view>
						</view>
						<view class="logding" v-if="isshowlogding" @click="addlistmusic">
							加载更多....
						</view>
						<view class="logding" v-if="!isshowlogding" @click="addlistmusic">
							没有更多....
						</view>
					</view>

				</view>
			</view>
		</view>

		<!-- Masking  遮罩 -->

		<view class="Masking" v-if="range">
			<view style="background-color: #202023;">
				<view class="music" v-for="(item, i) in searchlist"
					@click="startgq(item.id,item.al.picUrl,item.name,item.ar[0].name),masknone()">

					<view class="content">
						<view class="title">
							{{item.name}}
						</view>
						<!-- 作者 -->
						<view class="author">
							{{item.ar[0].name}}
						</view>
					</view>

					<view class="row-right">
						<view class="play-mv" @click="getmv" v-if="item.mv">
							<image src="../../static/icon/播放4.png" mode="aspectFit"></image>
						</view>
						<view class="play-mv" style="border: 0" v-if="!item.mv">
						</view>
						<view class="row-all">
							<image src="/static/icon/更多2.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="floor" v-if="bankSwitch" @click="changes"></view>

		<view class="listmask" v-if="bankSwitch == true" style="z-index: 99">
			<view class="list1">
				<view class="searchicon1">
					<image src="../../static/icon/排序.png" mode="aspectFit"></image>
				</view>
				<text class="t10">选择歌曲排序</text>
			</view>
			<view class="list2">
				<view class="clearall">
					<image src="../../static/icon/删除2.png" mode="aspectFit"></image>
				</view>
				<text class="t10">清空下载文件</text>
			</view>
			<view class="list3">
				<view class="report">
					<image src="../../static/icon/举报.png" mode="aspectFit"></image>
				</view>
				<text class="t10">举报</text>
			</view>
		</view>


		<minmusic 
		v-show="$store.state.showplaycomponent" 
		:imgk="musicpic" 
		:name="name" 
		:ren="ren" 
		:dd="dd" 
		:top="topnum" 
		@stopkk="bilibili"
		@xianok="okxian" 
		ref="child"
		></minmusic>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				title: null,
				range: false,
				long: '0',
				bankSwitch: false,
				id: null,
				pic1: helper.playpic,
				songdata: helper.songdata,
				mv: null,
				num: 1,
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				kk: helper.contminlist.kk,
				dd: helper.contminlist.dd,
				topnum: helper.contminlist.topnum,
				listnum: 20,
				getk: 0,
				watchnum: helper.playwacth.play,
				readnum: helper.playwacth.read,
				givenum: helper.playwacth.give,
				isshowlogding: true,
				singtext: '珂朵莉',
				singname: 'keduoli',
				ispage: 1
			};
		},

		onLoad(e) {
			this.ispage = e.page
			if(e.page == 1) {
				this.id = e.id
				let row = uni.getStorageSync('musiclist')[this.$store.state.musicSubscript]
				if(row) {
					this.name = row.title
					this.ren = row.name
					this.musicpic = row.img			
				}			
				this.getmusiclist()
			}else if(e.page == 2) {
				console.log(e.page)
			}
		},
		mounted() {

			this.$nextTick(() => {
				this.child = this.$refs.child
			})
		},
		methods: {
			masknone() {
				this.title = null
				this.range = false
			},
			addlistmusic() {
				if (this.songdata != null) {
					let tpe = this.songdata.length

					this.listnum = tpe + 20
					let numk = 20
					uni.request({
						url: `${helper.url}/playlist/track/all?id=${this.id}&limit=${numk}&offset=${tpe}`,
						success: (res) => {
							let list = res.data.songs
							if (list == '') {
								this.isshowlogding = false
								return
							}
							this.songdata = [...this.songdata, ...list]
							// console.log(this.songdata)
							// console.log(this.pic1)
						}
					})
				}
			},
			stormusiclist(e, img, title, name, size) {
				let value = uni.getStorageSync('musiclist');
				let np = false
				if(value) {
					let kenum = value.findIndex(function(item) {
						return item.e === e
					})
					if(kenum >= 0) {
						this.$store.commit('changeSubscript', kenum)
					}else if(kenum <= 0) {
						this.$store.commit('changeSubscript', 0)
					}
				}
					
				if(value.length > 0) {
					let keke = value.filter((item) => {
						return item.e == e
					})
					if(keke.length == 0) {
						np = true
					}else {
						np = false
					}
				}else if(!value || value.length === 0) {
					uni.setStorageSync('musiclist', [{
						e,
						title,
						name,
						img,
						size
					}])
				
				}
				
				if(np) {
					let tp = value
					tp.unshift({
						e,
						title,
						name,
						img,
						size
					})
					// console.log(tp)
					uni.setStorageSync('musiclist', tp);
				}
			},
			startgq(id,img, title, name,playsize) {
				getApp().watchmusice()
				
				
				helper.audiok.onEnded(() => {
					if (uni.getStorageSync('musiclist') <= 1) {
						helper.audiok.stop()
						this.$store.commit('changeControl', 1)
					} else {
						this.child.down()
					}
				})
				this.id = id
				helper.moredetail.push({
					"name": title,
					"singer": name
				})
				this.hello = 0
				
				this.$store.commit('changeControl', 0)
				uni.request({
					url: `${helper.url}/comment/music?id=${id}&limit=1`,
					success: (res) => {
						// console.log(res)
						let sizek = res.data.total
						if (sizek < 10000) {
							this.topnum = '999+'
							helper.plnumstr = '999+'
						} else if (sizek >= 10000 && sizek < 100000) {
							this.topnum = '1w+'
							helper.plnumstr = '1w+'
						} else if (sizek > 100000) {
							
							this.topnum = '10w+'
							helper.plnumstr = '10w+'
						}
						this.stormusiclist(id, img, title, name, this.topnum)
					}
				})
			
				uni.request({
					// url: `http://localhost:3000/song/url/v1?id=${k}&level=exhigh`,
					url: `${helper.url}/song/url/v1?id=${id}&level=exhigh`,
					success: (res) => {
			
						this.musicpic = img
						helper.contminlist.musicpic = img
						
						this.name = title
						helper.contminlist.name = title
						
						this.ren = name
						helper.contminlist.ren = name
						
						// this.$paper.ch = true
						
						this.dd = 0
						helper.contminlist.dd = 0
						
						this.$store.commit('changeshow', 1)
						
						// console.log('1',res.data.data[0].url)
						helper.audiok.autoplay = true
						helper.audiok.src = res.data.data[0].url

					}
				})
			
			},
			okxian(e) {
				console.log(e)
				this.xian = e
				helper.contminlist.xian = e
			},
			bilibili(e) {
				if (this.num != e) {
					this.num = 1
					this.dd = -100
					helper.contminlist.dd = -100
					// console.log(11,'k')
				} else {
					// console.log(11,'k1')
					this.num = e
					this.dd = 0
					helper.contminlist.dd = 0
				}
			},
			getmv() {
				// console.log(this.id)
				uni.reLaunch({

					url: `/pages/video/video?id=${this.id}&index=1`
				})
			},
			getmusiclist() {
				if (helper.playlistid == this.id) {
					return
				} else {
					// console.log(this.getk,1111)
					helper.songdata = null
					this.songdata = null
					this.getk = 1
				}

				helper.playlistid = this.id


				if (this.songdata === null || this.getk == 1) {
					uni.request({

						url: `${helper.url}/playlist/track/all?id=${this.id}&limit=20&offset=1`,
						success: (res) => {
							// console.log(res)
							// this.pic1 = res.data.songs[0].al.picUrl
							// helper.playpic = res.data.songs[0].al.picUrl
							this.getk = 0
							// console.log(res.data.songs)
							this.songdata = res.data.songs
							helper.songdata = res.data.songs
							// console.log(this.pic1)
							// console.log(this.songdata)

						}
					})
					uni.request({
						url: `${helper.url}/playlist/detail?id=${this.id}`,
						success: (res) => {
							// console.log(res)
							this.singname = res.data.playlist.name
							this.singtext = res.data.playlist.description
							this.pic1 = res.data.playlist.coverImgUrl
							helper.playpic = res.data.playlist.coverImgUrl
							this.watchnum = res.data.playlist.subscribedCount
							helper.playwacth.play = res.data.playlist.subscribedCount

							this.readnum = res.data.playlist.commentCount
							helper.playwacth.read =

								this.givenum = res.data.playlist.shareCount
							helper.playwacth.give = res.data.playlist.shareCount

						}
					})

				} else {
					this.pic1 = helper.playpic
					this.songdata = helper.songdata
					this.watchnum = helper.playwacth.play
					this.readnum = helper.playwacth.read
					this.givenum = helper.playwacth.give
				}

			},
			textclear() {
				this.title = null
			},
			back() {
				if (this.range === true) {
					this.range = false
					this.long = '0'
					this.title = null
				} else if(this.ispage == 1) {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}else if(this.ispage == 2) {
					uni.reLaunch({
						url: '/pages/myhome/myhome'
					})
				}
			},
			find() {
				// this.$refs.focusk.focus()
				this.range = true
				this.long = '50rpx'
			},
			showlist() {
				this.bankSwitch = true
			},
			changes() {
				this.bankSwitch = false
			},
		},
		computed: {
			watchnum1() {
				return (this.watchnum / 10000).toFixed(1)
			},

			searchlist() {
				return this.title == '' ? '' : this.songdata.filter(item => {
					return item.name.includes(this.title) || item.ar[0].name.includes(this.title)
				})
			},
			textnumche() {
				return this.text == 1 ? true : false
			}
		},
		watch: {
			text: {
				handler(new1, old) {
					console.log(new1, old)
				}
			},
			
		}

	}
</script>

<style lang="scss" scoped>
	/deep/.uni-scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	.playlist {

		// 遮罩
		.Masking {
			z-index: 999;
			position: absolute;
			left: 0;
			top: 160rpx;
			width: 750rpx;
			height: 100%;
			background-color: #202023;

			.music {
				z-index: 999;
				padding: 0 30rpx;
				margin: 30rpx 0 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #202023;

				.content {
					margin-right: 40rpx;
					flex: 7;

					.title {
						white-space: nowrap;
						width: 400rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 30rpx;
						color: #fff;
					}

					.author {
						font-size: 25rpx;
						color: rgba(255, 255, 255, .5)
					}
				}

				.row-right {
					flex: 2;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.play-mv {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 10rpx 12rpx;
						width: 20rpx;
						height: 20rpx;
						border: 1px solid #787271;
						border-radius: 15rpx;
					}

					.row-all {
						width: 50rpx;
						height: 50rpx;
						transform: rotate(90deg);
					}

				}
			}
		}

		.listmask {
			padding: 15rpx 10rpx;
			position: absolute;
			top: 0;
			right: 0;
			width: 350rpx;
			// height: 100rpx;
			background-color: #333333;

			// display: flex;
			.list1,
			.list2,
			.list3 {
				color: #fff;
				display: flex;
				justify-content: start;
				align-items: center;
				padding: 15rpx 20rpx;

				.searchicon1,
				.clearall,
				.report {
					margin-right: 15rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.floor {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background-color: transparent;
		}





		.box {
			box-sizing: border-box;
			height: 100%;
			// background-color: #000;
			// margin-bottom: 40rpx;

			.box-top {
				// overflow: hidden;
				position: fixed;
				z-index: 99;
				top: 0;
				left: 0;
				padding: 40rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;

				.keduoli1 {
					overflow: hidden;
					position: absolute;
					top: 0;
					left: 0;
					width: 750rpx;
					height: 160rpx;
					background-color: #202023;

					.minke {
						width: 100%;
						height: 810rpx;
						// object-fit: cover;
					}
				}

				.callback-icon {
					flex: 1;
					margin-right: 30rpx;
					width: 50rpx;
					height: 50rpx;
				}

				.playicon {
					position: relative;

					.input {
						color: rgba(255, 255, 255, .7);
						position: absolute;
						display: flex;
						// align-items: center;
						left: 0;
						bottom: 0;
						width: 630rpx;
						font-size: 35rpx;
						// height: 50rpx;
						border: 0;
						border-bottom: 1px solid rgba(255, 255, 255, .5);
					}

					.clear {
						position: absolute;
						top: -10rpx;
						right: -140rpx;
						width: 50rpx;
						height: 50rpx;
					}

					flex: 7;
					min-width: 480rpx;

					// background-color: #000;
					.porup {
						display: flex;
						justify-content: start;
						align-items: center;

						.icon {
							padding-right: 10rpx;
							width: 50rpx;
							height: 50rpx;
						}

						.t1 {
							font-size: 40rpx;
							color: #fff;
						}
					}
				}

				.Searchlist {

					flex: 2;
					display: flex;
					justify-content: center;
					align-items: center;

					.search {
						margin-right: 40rpx;
						width: 50rpx;
						height: 50rpx;
						// background-color: #000;
					}

					.alllist {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}

			.playlistpic {
				z-index: -2;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 50%;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				text-align: center;

				.songmask {
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, .1);
				}

				.text {
					position: absolute;
					padding-bottom: 80rpx;
					color: #fff;

					.font {
						padding-bottom: 20rpx;
						font-size: 60rpx;
						font-weight: 800;
					}

					.t2 {
						
						font-size: 30rpx;
						padding-bottom: 20rpx;
					}

					.t3 {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						height: 2em;
						width: 95%;
						// padding: 0 30rpx;
						padding-bottom: 20rpx;
						color: rgba(255, 255, 255, .7);
					}
				}
			}

			.btnlist {
				z-index: 10;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				padding: 10rpx 20rpx;
				background-color: #333;
				color: #fff;
				border-radius: 40rpx;
			}

			.playlistbottom {
				overflow-y: auto;
				z-index: 9;
				position: absolute;
				top: 50%;
				left: 0;
				width: 100%;
				height: 50%;
				background-color: #202023;

				.minbox {
					// position: fixed;
					// top: 50%;
					// left: 0;
					width: 100%;
					height: 100%;
					background-color: #202023;

					.minbox-top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 90rpx;
						padding: 0 25rpx;

						.minboxplay-icon {
							flex: 1;
							width: 50rpx;
							height: 50rpx;
						}

						.playtext {
							padding-left: 40rpx;
							flex: 7;
							color: #fff;

							.t8 {
								color: rgba(255, 255, 255, .5);
							}
						}

						.down {
							flex: 2;
							display: flex;
							justify-content: center;
							align-items: center;

							.down-icon,
							.down-all {
								width: 45rpx;
								height: 45rpx;
							}

							.down-icon {
								padding-right: 30rpx;
							}
						}
					}

					.musiclist {
						overflow-y: hidden;
						margin-top: 30rpx;
						background-color: #202023;

						.logding {
							margin: 40rpx auto 0;
							width: 40%;
							margin-bottom: 180rpx;
							padding: 30rpx;
							text-align: center;
							color: rgba(255, 255, 255, .7);
							cursor: pointer;
							background-color: rgba(255, 255, 255, .1);
							border-radius: 10rpx;
						}

						.musicmin {
							padding: 0 25rpx;

							.music {

								margin: 35rpx 0;
								display: flex;
								justify-content: space-between;
								align-items: center;

								.top {
									display: flex;
									justify-content: center;
									align-items: center;
									font-size: 40rpx;
									padding-right: 40rpx;
									flex: 1;
									color: rgba(255, 255, 255, .5);
								}

								.content {
									margin-right: 40rpx;
									flex: 7;

									.title {
										white-space: nowrap;
										width: 400rpx;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 30rpx;
										color: #fff;
									}

									.author {
										font-size: 25rpx;
										color: rgba(255, 255, 255, .5)
									}
								}

								.row-right {
									flex: 2;
									display: flex;
									align-items: center;
									justify-content: space-between;

									.play-mv {
										display: flex;
										justify-content: center;
										align-items: center;
										padding: 10rpx 12rpx;
										width: 20rpx;
										height: 20rpx;
										border: 1px solid #787271;
										border-radius: 15rpx;
									}

									.row-all {
										width: 50rpx;
										height: 50rpx;
										transform: rotate(90deg);
									}

								}
							}
						}
					}
				}
			}
		}


		.collection,
		.give {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 5rpx 20rpx;
		}

		.comments {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20rpx;
			border-left: 2rpx solid rgba(255, 255, 255, .2);
			border-right: 2rpx solid rgba(255, 255, 255, .2);
			margin: 14rpx 0;
		}

		.icon1,
		.icon2,
		.icon3 {
			padding-right: 15rpx;
			width: 40rpx;
			height: 40rpx;
		}
	}
</style>