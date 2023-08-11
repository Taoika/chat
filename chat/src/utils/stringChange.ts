/**
 * rgb提取
 * @param rgbString rgb(xxx, xxx, xxx)
 * @returns 
 */
export const extractRGBColor = (rgbString: string): [number, number, number] => {
    const pattern = /rgb\((\d+),(\d+),(\d+)\)/;
    const match = rgbString.match(pattern);
    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      return [r, g, b];
    } else {
        console.log('颜色提取失败!');
        return [100, 100, 100];
    }
}

/**
 * 颜色加深
 * @param rgbString rgb(xxx, xxx, xxx)
 * @param change 加深的变化数组
 * @returns 加深后的变化数组
 */
export const darkenRgb = (rgbString: string, change: number[]): number[] => {
    const rgb = extractRGBColor(rgbString)
    if(rgb) {
        return rgb.map((value, index)=>value-change[index])
    }
    else {
        return [0,0,0];
    }
}