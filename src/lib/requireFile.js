/**
 * 執行require動作換成相對路徑,預設以指向根目錄assets
 * @param {string} url 文件的位置
 * @returns file-loader後的結果
 */
export default function requireFile (url) {
  return require('../assets/' + url)
}
