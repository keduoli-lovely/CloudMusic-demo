<template>
	<view class="cares night">
		<view class="title-pic" >
			<image :src="pic" mode="aspectFill"></image>
		</view>
		<view class="con-text">
			
			<!-- // 用户昵称 -->
			<view class="person">
				<view class="person-top">
					<view class="name">
						{{name}}
					</view>
					<view class="introduce">
						{{timedate}}
					</view>
				</view>
				
				<!-- // 关注按钮 -->
				<!-- <view class="addlive">
					<view class="addicon">
						+
					</view>
					<text class="t2">关注</text>
				</view> -->
			</view>
			
			<!-- // 内容区域 -->
			
			<view class="row-text">
				<!-- // 回复,或发表的评论 -->
				<view class="vital-text" @click="getdetail(context.msg, name, listpic, threadId, pic, timedate)">
					{{context.msg}}
				</view>
				
				<view class="pics" v-if="listpic.length">
					<view class="rowpic" v-for="(item, index) in listpic" :key="index" >
						<view class="picbox" v-if="isshowpic" @click="quitpic">
							<image  :src="clickpic" mode="widthFix"></image>
						</view>
						<image @click="shownew(index)" class="pic1"  :src="item.squareUrl" mode="widthFix"></image>
					</view>
				</view>
				
				<view class="cite-musice" v-if="context.song" @click="playke(context.song.id,
				context.song.album.blurPicUrl,
				context.song.name,
				songname,
				topnum)">
					<view class="musice-pic">
						<image :src="context.song.album.blurPicUrl" mode="aspectFill"></image>
					</view>
					<view class="musice-detail">
						<view class="musice-name">
							{{context.song.name}}
						</view>
						<view class="musice-author">
							<view class="namelist" >
								{{songname}}
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
			<!-- // 分享,评论下的评论, 点赞 -->
			
			<view class="other">
				<!-- // share 分享的意思 -->
				<view class="share">
					<view class="share-icon">
						<image src="/static/icon/分享.png" mode="aspectFit"></image>
					</view>
					{{give}}
				</view>
				
				<!-- // floor 楼层/地板的意思 -->
				
				<view class="floor" @click.stop="getdetail(context.msg, name, listpic, threadId, pic, timedate)">
					<view class="floor-icon">
						<image src="/static/icon/评论.png" mode="aspectFit"></image>
					</view>
					{{plun}}
				</view>
				<!-- // 神马情况，Like有点赞的意思 -->
				<view class="Like" @click="addlive">
					<view class="Like-icon" v-if="islive">
						<image src="/static/icon/点赞2.png" mode="aspectFit"></image>
						
					</view>
					<view class="Like-icon" v-else>
						<image src="/static/icon/点赞1.png" mode="aspectFit"></image>
						
					</view>
					{{livenum}}
				</view>
				
				<view class="more">
					<image src="/static/icon/Android更多.png" mode="fit"></image>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	import day from 'dayjs'
import dayjs from 'dayjs';
	export default {
		name:"NewsThatCares",
		data() {
			return {
				topnum: helper.plnumstr,
				isshowpic: false,
				clickpic: '',
				islive: false
			};
		},
		props:['name','pic', 'id', 'con', 'livenum', 'plun', 'give', 'listpic', 'time', 'threadId'],

		methods: {
			addlive() {
				let key = uni.getStorageSync('cookie')
				if(this.islive) {
					this.livegtefn(key, 0)
				}else {
					this.livegtefn(key, 1)
				}
				this.islive = !this.islive
			},
			livegtefn(key, state) {
				uni.request({
					url: `${helper.url}/comment/like?type=6&cid=${this.id}&threadId=${this.threadId}&t=${state}`,
					data: {
						cookie: key
					},
					success: (res) => {
						console.log(res)
					}
				})
			},
			getdetail(con, name, pic, id, bgimg, time) {
				let obj = {
					con, 
					pic, 
					name, 
					id,
					bgimg,
					time,
					live: this.livenum,
					give: this.give,
					plun: this.plun
				}
				document.body.style.cssText = `overflow:hidden`
				this.$store.commit('changeshowrevtop', 0)
				uni.$emit('sendmsg', obj)
			},
			quitpic() {
				document.body.style.cssText = ''
				this.isshowpic = !this.isshowpic
			},
			shownew(e) {
				document.body.style.cssText = `overflow:hidden`
				this.clickpic = this.listpic[e].originUrl
				this.isshowpic = !this.isshowpic
			},
			playke(id, img, title, name) {
				this.$store.commit('changeshowheader', false)
				let obj = {
					id, 
					img, 
					title,
					name
						}
						
				uni.$emit('conceplay', obj)		
			}
		},
		computed: {
			timedate() {
				return dayjs(this.time).format('M月DD日')
			},
			context() {
				return JSON.parse(this.con)
			},
			songname() {
				let name = ''
				let x = this.context.song.artists
				x.forEach(item => {
					name += ' ' + item.name
				})
				return name
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}
	.cares::after {
		content: '';
		position: absolute;
		left: -30rpx;
		bottom: 0;
		width: 150%;
		height: 1rpx;
		background-color: var(--bordercolor);
	}
	.cares {
		position: relative;
		margin-top: 35rpx;
		display: flex;
		.title-pic {
			margin-right: 40rpx;
			width: 100%;
			height: 85rpx;
			border-radius: 50%;
			overflow: hidden;
		}
		.con-text {
			.person {
				width: calc(750rpx - 165rpx);
				min-width: 400rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.person-top {
					.name  {
						color: var(--indexfontcolor);
					}
					.introduce {
						font-size: 24rpx;
						color: var(--btnfontcolor);
					}
				}
				.addlive {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100rpx;
					height: 40rpx;
					background-color: transparent;
					border: 2rpx solid red;
					border-radius: 40rpx;
					color: red;
					.addicon {
						margin-right: 3rpx;
						font-size: 34rpx;
					}
					.t2 {
						margin-left: 3rpx;
						font-size: 24rpx;
					}
				}
				
			}
			.row-text {
				margin: 20rpx 0 10rpx;
				.vital-text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
					margin-bottom: 20rpx;
					font-size: 30rpx;
					color: var(--liveuserfontcolor);
				}
				.pics {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					.rowpic {
						.pic1 {
							width: 280rpx;
							// height: 180rpx;
						}
						.picbox {
							z-index: 99;
							position: fixed;
							top: 50%;
							left: 0;
							width: 750rpx;
							// height: 600rpx;
							transform: translateY(-50%);
						}
					}
				}
				.cite-musice {
					margin-bottom: 20rpx;
					display: flex;
					padding: 12rpx;
					background-color: #666;
					border-radius: 14rpx;
					.musice-pic {
						margin-right: 18rpx;
						width: 80rpx;
						height: 80rpx;
						border-radius: 14rpx;
						overflow: hidden;
					}
					.musice-detail {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.musice-name {
							color: var(--indexfontcolor);
							font-weight: 550;
							font-size: 32rpx;
						}
						.musice-author {
							display: flex;
							color: var(--liveuserfontcolor);
							font-size: 24rpx;
							.namelist {
								padding-right: 8rpx;
							}
						}
					}
				}
			}
			.other {
				margin-bottom: 14rpx;
				position: relative;
				// background-color: #666;
				display: flex;
				align-items: center;
				color: var(--indexfontcolor);
				
				.share {
					display: flex;
					align-items: center;
					padding: 20rpx 0;
					display: flex;
					color: var(--indexfontcolor);
					font-size: 24rpx;
					
					.share-icon {
						margin-right: 10rpx;
					}
				}
				.floor {
					display: flex;
					margin: 0 100rpx 0 80rpx;
					.floor-icon {
						margin-right: 6rpx;
					}
				}
				
				
				.more {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.Like {
					display: flex;
					color: var(--indexfontcolor);
					font-size: 28rpx;
					.Like-icon {
						margin-right: 5rpx;
					}
				}
				.share-icon,
				.floor-icon,
				.Like-icon,
				.more {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>