import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	actions: {
		
	},
	mutations: {
		changeshow(con, value) {
			con.showplaycomponent = value
		},
		changeControl(con, value) {
			con.controlPlayAndStop = value
		},
		changeSubscript(con, value) {
			con.musicSubscript = value
		},
		changemusicePercentage(con, value) {
			con.globalmusicePercentage = value
		},
		changemusiceminute(con, value) {
			con.globalmusiceminute = value
		},
		changemusicesecond(con, value) {
			con.globalmusicesecond = value
		},
		changemusiceProgress(con, value) {
			con.musiceProgress = value
		},
		changefirsttime(con, value) {
			con.firsttime = value
		},
		changelasttime(con, value) {
			con.lasttime = value
		},
		changemusiceplaylength(con, value) {
			con.musiceplaylength = value
		},
		changeLogin(con, value) {
			con.loginState = value
		},
		getusername(con, value) {
			con.username = value
		},
		getuserid(con, value) {
			con.userid = value
		},
		getuserheadpic(con, value) {
			con.userheadpic = value
		},
		getfolloweds(con, value) {
			con.followeds = value
		},
		getfollow(con, value) {
			con.follow = value
		},
		getlivemusicelist(con, value) {
			con.livemusicelist = value
		},
		setmusicedata(con, value) {
			con.livemusicelistdata = value
		},
		changeshowhome(con, value) {
			con.showhome = value
		},
		
		// 用户动态的信息
		
		changesecondaryExpertIdentiy(con, value) {
			con.secondaryExpertIdentiy = value
		},
		changebriefDesc(con, value) {
			con.briefDesc = value
		},
		changelovename(con, value) {
			con.lovename = value
		},
		changeavatar(con, value) {
			con.avatar = value
		},
		changeuserhomemusice(con, value) {
			con.userhomemusice = value
		},
		changeshowheader(con, value) {
			con.showheader = value
		},
		changeshowrevtop(con, value) {
			con.showrevtop = value
		},
		oldAndnew(con, value) {
			con.showandnone = value
		}
	},
	state: {
		// 控制播放页面的 -- 显示/隐藏
		showandnone: -100,
		// 控制底部播放组件的显示与隐藏
		showplaycomponent: 0, // xina
		showhome: 95,
		// 控制播放与暂停
		controlPlayAndStop: 0, // kk
		// 标志着当前播放歌曲的下标
		musicSubscript: 0  ,// few
		
		// 音乐的总长度
		globalmusicePercentage: 0,
		globalmusiceminute: 0,
		globalmusicesecond: 0,
		// 音乐百分比
		musiceProgress: 0,
		
		firsttime: 0,
		lasttime: 0,
		
		musiceplaylength: 0,
		
		// 登入状态
		loginState: false,
		
		
		// 用户信息
		username: '',
		userid: '',
		userheadpic: '',
		followeds: 0,
		follow: 0,
		
		// 喜欢的音乐的id列表
		livemusicelist: [],
		
		livemusicelistdata: [],
		
		// 用户动态的信息
		
		secondaryExpertIdentiy: [],
		briefDesc: '',
		lovename: '',
		avatar: '',
		userhomemusice: [],
		
		// 控制关注页面header的显示与隐藏
		showheader: true,
		
		// 控制关注页面详情的显示与隐藏
		showrevtop: 100
	}
})