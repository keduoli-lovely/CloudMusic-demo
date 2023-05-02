let contminlist = {
	musicpic: null,
	name: null,
	ren: null,
	dd: -100,
	topnum: null,
	xian: null
}
let musiclength = {
	"musicePercentage": 0,
	"staretime": 0,
	"endtime": 0,
	"playlength": 0
}
let pace = {
	"firsttime": 0,
	"lasttime": 0.,
	"liveLine": 0,
	"time": 0,
	"livemusic": 0,
	"skipnum": 0,
	"num": 0,
	"ketime": 0
}
let playwacth = {
	"play": 0,
	"read": 0,
	"give": 0
}

let bodydata = {
	"bannerTitlePic": '',
	"bannerTitleIcon": '',
	"bannerTitleSing": ''
}

let moredetail = []
let musicpiclist = []
let musiclist = []

// let comments = []
// let hotcomments = []

let kk1 = 1
let lrc = null
let time = 0
let songdata = null
let playlistid = null
let playpic = null
let lrcid = null
let count = null
let plnumstr = ''

const audiok = uni.createInnerAudioContext();

const url = 'http://localhost:3000'

export default {
	// 全局的请求地址
	url,
	// 一些复用的属性,保证播放页面的展示与隐藏
	contminlist,
	// 保存音乐的相关信息,如音乐长度, 用户点击音乐条跳转的位置等
	musiclength,
	// 音乐的详情,歌手姓名,音乐名称
	moredetail,
	// 播放过的音乐,保证全局可用
	musiclist,
	// playlist页面的音乐列表,防止页面刷新又请求资源
	songdata,
	// 音频的实例,保证页面关闭或切换依旧可以使用
	audiok,
	// 音乐的播放进度,跳转位置,音乐总长
	pace,
	// uniapp的音乐更新事件的值,方便设置播放进度
	time,
	// 存储歌词,保证页面切换关闭依旧有歌词
	lrc,
	// 控制暂停和播放图标的切换
	kk1,
	// 确认歌单的id id更变就清空全局的songdata,防止被制止而拿不到最新数据
	playlistid,
	playpic,
	// 播放数量, 评论, 转发
	playwacth,
	lrcid,
	// 主页的图片等
	bodydata,
	// 用于播放列表显示红色的计数
	count,
	// 评论
	// comments,
	// hotcomments
	
	// 评论数量
	plnumstr
}