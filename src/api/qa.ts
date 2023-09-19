import QAList from "../mock/qa.json";

// 获取热门推荐内容
function getPopular() {
  return Promise.resolve({
    code: QAList.code,
    message: QAList.message,
    data: QAList.data.popularList
  });
}

// 获取聊天日志信息
function getChatLog() {
  return Promise.resolve({
    code: QAList.code,
    message: QAList.message,
    data: QAList.data.chatLog
  }); 
}

// 获取历史信息
function getHistory() {
  return Promise.resolve({
    code: QAList.code,
    message: QAList.message,
    data: QAList.data.historyList
  });
}

export {
  getPopular,
  getChatLog,
  getHistory
};
