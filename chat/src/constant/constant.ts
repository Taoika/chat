// 请求地址
const baseUrl = '39.98.41.126:31121'

export const httpBaseUrl = `http://${baseUrl}`;
export const getTokenUrl = `${httpBaseUrl}/uaa/oauth/token`; // 获取token
export const getUserUrl = `${httpBaseUrl}/user/inner/getUserByUsername`; // 获取用户名
export const getMsgUrl = `${httpBaseUrl}/msg/getMsg`; // 获取历史信息
export const getOnlineUsersUrl = `${httpBaseUrl}/status/getChatRoomUserStatus/1`; // 获取在线用户信息
export const fileUploadUrl = `${httpBaseUrl}/file/upload`; // 文件上传
export const getChatRoomUsersUrl = `${httpBaseUrl}/chatRoom/list/1`; // 获取群聊用户信息
export const getActerUrl = `${httpBaseUrl}/msg/1`; // 获取群聊用户信息

export const wsBaseUrl = `ws://${baseUrl}`
export const wsUrl = `${wsBaseUrl}/ws`; // websocket

// 名字库
export const names = [
    "佐藤 Sato", "铃木 Suzuki", "高桥 Takahashi", "田中 Tanaka", "渡边 Watanabe",
    "伊藤 Ito", "山本 Yamamoto", "中村 Nakamura", "小林 Kobayashi", "斋藤 Saito",
    "加藤 Kato", "吉田 Yoshida", "山田 Yamada", "佐々木 Sasaki", "山口 Yamaguchi",
    "松元 Matsumoto", "井上 Inoue", "木村 Kimura", "林 Hayashi", "清水 Shimizu",
    "山崎 Yamazaki", "中岛 Nakajima", "池田 Ikeda", "阿部 Abe", "桥本 Hashimoto",
    "山下 Yamashita", "森 Mori", "石川 Ishikawa", "前田 Maeda", "小川 Ogawa",
    "藤田 Fujita", "冈田 Okada", "后藤 Goto", "长谷川 Hasegawa", "石井 Ishii",
    "村上 Murakami", "近藤 Kondo", "坂本 Sakamoto", "远藤 Endo", "青木 Aoki",
    "藤井 Fujii", "西村 Nishimura", "福田 Fukuda", "太田 Ota", "三浦 Miura",
    "藤原 Fujiwara", "冈本 Okamoto", "松田 Matsuda", "中川 Nakagawa", "中野 Nakano",
    "原田 Harada", "小野 Ono", "田村 Tamura", "竹内 Takeuchi", "金子 Kaneko",
    "和田 Wada", "中山 Nakayama", "石田 Ishida", "上田 Ueda", "森田 Morita",
    "小岛 Kohjima", "柴田 Shibata", "原 Hara", "宫崎 Miyazaki", "酒井 Sakai",
    "工藤 Kudo", "横山 Yokoyama", "宫本 Miyamoto", "内田 Uchida", "高木 Takagi",
    "安藤 Ando", "岛田 Shimada", "谷口 Taniguchi", "大野 Ono", "高田 Takada",
    "丸山 Maruyama", "今井 Imai", "河野 Kono", "藤本 Fujimoto", "村田 Murata",
    "武田 Takeda", "上野 Ueno", "杉山 Sugiyama", "增田 Masuda", "小山 Koyama",
    "大冢 Otsuka", "平野 Hirano", "菅原 Sugawara", "久保 Kubo", "松井 Matsui",
    "千叶 Chiba", "岩崎 Iwasaki", "樱井 Sakurai", "木下 Kinoshita", "野口 Noguchi",
    "松尾 Matsuo", "菊地 Kikuchi", "野村 Nomura", "新井 Arai", "渡部 Watanabe","梦 Yume", "雨 Ame", "辰 Shin", "雪 Yuki", "心 Kokoro", "琴 Koto", "幻 Maboroshi", "璃 Ri", "斯 Shi", "彤 Tom", "竹 Take", "月 Tsuki", "星 Hoshi", "风 Kaze", "山 Yama", "水 Mizu", "花 Hana", "夜 Yoru", "雁 Gan", "晴 Hare", "海 Umi", "石 Ishi", "枫 Kaede", "云 Kumo", "桃 Momo", "露 Tsuyu", "鹿 Shika", "岚 Ran", "兰 Ran", "丹 Tane", "泉 Izumi", "柳 Ryu", "河 Kawa", "松 Matsu", "岩 Iwa", "蓝 Aoi", "青 Ao", "秋 Aki", "莲 Ren", "翠 Midori", "楼 Rou", "绮 Ki", "菡 Hina", "宇 U", "蓉 Yo", "琼 Jin", "叶 You", "曦 Xi", "波 Nami", "珊 Shan", "萍 Ping", "映 Ei", "柔 Yawaraka", "盈 Ying", "薇 Wei", "凝 Ning", "舞 Mai", "忆 Yi"
];

// 图标库
export const icons = [
    'icon-nvren', 'icon-darennf', 'icon-cnertong', 'icon-nan-copy', 'icon-iconfontfuwurenyuan', 
    'icon-woman', 'icon-nvren1', 'icon-ertong', 'icon-ertong1', 'icon-nvren2', 'icon-ertong2', 
    'icon-touxiang', 'icon-iconnvhai', 'icon-xingzhuang8', 'icon-ertong3', 'icon-ertong4', 'icon-nvren3', 
    'icon-nvren01', 'icon-touxiang1', 'icon-ertongpeixun', 'icon-nvrentouxiang', 'icon-zhuyuanhushizhan', 
    'icon-xinggan', 'icon-hushi', 'icon-tubiaozhizuomoban', 'icon-hushiwenzhen', 'icon-hushi_nurse', 
    'icon-nvren_woman', 'icon-nvren_woman1', 'icon-icon-nvhai', 'icon-lingdao', 'icon-nanren', 
    'icon-xuesheng', 'icon-per_women', 'icon-nvhaizi', 'icon-xiaonvhai', 'icon-nvshi', 'icon-nvren4', 
    'icon-nanren1', 'icon-nvren5', 'icon-hushitianshi', 'icon-ertong5', 'icon-nvrenshixing', 'icon--ertong', 
    'icon-xuesheng1', 'icon-police', 'icon-nvhaizhi', 'icon-ertongerbihou-houyan', 'icon-nvren-copy', 
    'icon-hunli-', 'icon-nvren6', 'icon-nanren2', 'icon-nvrenx', 'icon-Police', 'icon-touxiang2', 
    'icon-xuesheng2', 'icon-police1', 'icon-xuesheng3', 'icon-touxiang3', 'icon-xuesheng4', 'icon-nvxing', 
    'icon-xuesheng5', 'icon-xuesheng6', 'icon-ertong6', 'icon-touxiang4', 'icon-ertong7', 'icon-nvhaizihuise', 
    'icon-bz-police--o', 'icon-nvshi1', 'icon-ertong-', 'icon-ertongchike', 'icon-ertong8', 'icon-xuesheng7', 
    'icon-keshihushi', 'icon-199-police', "icon-hushi1", "icon-hushi2", "icon-nvhaisheng", "icon-zhuyuanhushi", 
    "icon-maozinvren", "icon-children", "icon-stranger-full", "icon-dad", "icon-nvhushi1", "icon-female-avatar", 
    "icon-niboernvren", "icon-ertong9", "icon-policeman", "icon-zhinengjiajuAPP--nvhaifang", "icon-hushi3", 
    "icon-hushinvyisheng", "icon-Lift-someone", "icon-hushi21", "icon-ertong-01", "icon-ren", "icon-nvhai", 
    "icon-nvshi11", "icon-a-icon-person-nv2", "icon-nvren011", "icon-police2", "icon-hushi4", "icon-touxiang5", 
    "icon-touxiang-nvren"
];