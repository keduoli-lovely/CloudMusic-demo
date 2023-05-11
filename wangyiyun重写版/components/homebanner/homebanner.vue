<template>
	<view class="homebanner night">
		<view class="top">
			<view class="top-left">
				<view class="playicon">
					<image src="/static/icon/Recent.png" mode="aspectFit"></image>
				</view>
				<view class="text">
					播放全部
				</view>
				<view class="num">
					{{'(' + musicemach + ')'}}
				</view>
			</view>
			<view class="topright">
				<view class="allicon">
					<image src="/static/icon/多选.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>

		<view class="musicelist" v-if="page == 1">
			<view class="row" v-for="(item, index) in musicelist" :key="index"
				@click="senddata(item.data.id, item.data.al.picUrl, item.data.name, item.data.ar[0].name, topnum)">
				<view class="passsolt">
					<view class="stor">
						{{index + 1}}
					</view>
					<view class="row-left">
						<view class="title">
							{{item.data.name}}
						</view>
						<view class="name">
							{{item.data.ar[0].name}} - {{item.data.al.name}}
							{{item.data.alia[0]}}
						</view>
					</view>
				</view>
				<view class="row-right">
					<view class="playmv" v-if="item.data.mv" @click="getmv(item.data.id, item.data.name)">
						<view class="playmask">
							<image src="/static/icon/播放4.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="more">
						<image src="/static/icon/Android更多.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="musicelist" v-else-if="page == 2">
			<view class="row" v-for="(item, index) in musicelist" :key="index"
				@click="senddata(item.simpleSong.id, item.simpleSong.al.picUrl, item.simpleSong.name, item.simpleSong.ar[0].name, topnum)">
				<view class="passsolt">
					<view class="stor">
						{{index + 1}}
					</view>
					<view class="row-left">
						<view class="title">
							{{item.simpleSong.name}}
						</view>
						<view class="name">
							{{item.simpleSong.ar[0].name}} - {{item.simpleSong.al.name}}
							{{item.simpleSong.alia[0]}}
						</view>
					</view>
				</view>
				<view class="row-right">
					<view class="playmv" v-if="item.simpleSong.mv"
						@click="getmv(item.simpleSong.id, item.simpleSong.name)">
						<view class="playmask">
							<image src="/static/icon/播放4.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="more">
						<image src="/static/icon/Android更多.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				topnum: helper.plnumstr
			};
		},
		props: ['musicelist', 'isminshow', 'page'],
		mounted() {
			this.$nextTick(() => {
				this.child = this.$refs.child
			})
		},
		methods: {
			senddata(id, img, title, name, size) {
				this.$emit('fulldata', {
					id,
					img,
					title,
					name,
					size
				})
			},
			getmv(id, name) {
				uni.navigateTo({
					url: `/pages/video/video?id=${id}&index=3&title=${name}`
				})
			}
		},
		computed: {
			musicemach() {
				return this.musicelist == undefined ? 0 : this.musicelist.length
			}
		}
	}
</script>

<style lang="scss">
	.homebanner {
		padding: 0 30rpx 100rpx;
		overflow: hidden;
		height: 100%;
		background-color: var(--indexgbcolor);

		// padding: 30rpx;

		.top {
			z-index: 10;
			position: sticky;
			top: 0;
			// margin-bottom: 40rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: var(--indexgbcolor);

			.top-left {
				display: flex;

				.playicon {
					margin-right: 18rpx;
					width: 45rpx;
					height: 45rpx;
				}

				.text {
					margin-right: 15rpx;
					color: var(--indexfontcolor);
				}

				.num {
					color: var(--searchlistfontcolor);
				}
			}

			.topright {
				.allicon {
					width: 45rpx;
					height: 45rpx;
				}
			}
		}

		.musicelist {
			overflow-y: auto;
			height: calc(100% - 200rpx);
			// margin-bottom: 400rpx;
			.row:first-child {
				padding-top: 0;
			}

			.row:last-child {
				padding-bottom: 255rpx;
			}

			.row {
				padding-top: 50rpx;
				display: flex;
				justify-content: space-between;
				color: var(--indexfontcolor);
				.passsolt {
					display: flex;
					align-items: center;
					.stor {
						font-size: 32rpx;
						padding-right: 35rpx;
						color: #666;
					}
				}
				.row-left {
					.title {
						width: 480rpx;
						overflow-x: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: var(--indexfontcolor);
						font-size: 34rpx;
					}

					.name {
						width: 480rpx;
						overflow-x: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						font-size: 26rpx;
						color: var(--searchlistfontcolor);
					}
				}

				.row-right {
					display: flex;
					align-items: center;

					.playmv {
						margin-right: 20rpx;
						box-sizing: border-box;
						padding: 0 0 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border: 1rpx solid var(--bordercolor);
						width: 50rpx;
						height: 40rpx;
						border-radius: 14rpx;

						.playmask {
							width: 20rpx;
							height: 20rpx;
						}
					}

					.more {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}

	}
</style>