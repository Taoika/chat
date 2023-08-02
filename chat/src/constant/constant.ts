// 请求地址
const baseUrl = '39.98.41.126:31121'

export const httpBaseUrl = `http://${baseUrl}`;
export const getTokenUrl = `${httpBaseUrl}/uaa/oauth/token`; // 获取token
export const getUserUrl = `${httpBaseUrl}/user/inner/getUserByUsername`; // 获取用户名
export const getMsgUrl = `${httpBaseUrl}/msg/getMsg`; //获取历史信息

export const wsBaseUrl = `ws://${baseUrl}`
export const wsUrl = `${wsBaseUrl}/ws`; // websocket

// 名字库
export const names = [
    "佐藤", "铃木", "高桥", "田中", "渡边", "伊藤", "山本", "中村", "小林", "斋藤",
    "加藤", "吉田", "山田", "佐々木", "山口", "松元", "井上", "木村", "林", "清水",
    "山崎", "中岛", "池田", "阿部", "桥本", "山下", "森", "石川", "前田", "小川",
    "藤田", "冈田", "后藤", "长谷川", "石井", "村上", "近藤", "坂本", "远藤", "青木",
    "藤井", "西村", "福田", "太田", "三浦", "藤原", "冈本", "松田", "中川", "中野",
    "原田", "小野", "田村", "竹内", "金子", "和田", "中山", "石田", "上田", "森田",
    "小岛", "柴田", "原", "宫崎", "酒井", "工藤", "横山", "宫本", "内田", "高木",
    "安藤", "岛田", "谷口", "大野", "高田", "丸山", "今井", "河野", "藤本", "村田",
    "武田", "上野", "杉山", "增田", "小山", "大冢", "平野", "菅原", "久保", "松井",
    "千叶", "岩崎", "樱井", "木下", "野口", "松尾", "菊地", "野村", "新井", "渡部"
  ];