//获取随机名字
export function getRandomName(names:string[]) {
    // 从 names 数组中随机选择一个值
    var randomIndex = Math.floor(Math.random() * names.length);
    var selectedName = names[randomIndex];
    //50%概率添加英文字母
    if (Math.random() < 0.5) {
        var randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // 生成随机小写字母
        selectedName += randomLetter;
        //50%概率添加的这个英文字母是大写
        if (Math.random() < 0.5) {
          selectedName = selectedName.charAt(0).toUpperCase() + selectedName.slice(1); // 将首字母转换为大写
        }
      }
    
    return selectedName;
  }
  //生成随机颜色
  export function getRandomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + "," + green + "," + blue + ")";
  }

  // 生成随机头像
  export const getRandomIconClass = (iconClasses: string[]) => {
    const randomIndex = Math.floor(Math.random() * iconClasses.length);
    return iconClasses[randomIndex];
  }
  