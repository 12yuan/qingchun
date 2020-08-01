// request.js
let OK = 20000;
let ERROR = 20001;//ʧ��
let LOGIN_ERROR = 20002;//�û������������
let ACCESS_ERROR = 20003;//Ȩ�޲���
let REMOTE_ERROR = 20004;//Զ�̵���ʧ��
let REPE_EOOR = 20005;//�ظ�����
const request = options => {
  return new Promise((resolve, reject) => {
    const { data, method } = options
    if (data && method !== 'get') {
      options.data = JSON.stringify(data)
    }
    wx.request({
      header: { 'Content-Type': 'application/json' },
      ...options,
      success: function (res) {
        if (res.data.flag) {
          if (res.data.code == OK) {
            resolve(res.data)
          } else {
            console.log(res.data);
            if (res.data.code == ERROR) {
              wx.showToast({
                title: '��������������ϵ����Ա��',
                icon: 'none',
                duration: 1500
              })
            } else if (res.data.code == LOGIN_ERROR) {
              wx.showToast({
                title: '�û������������',
                icon: 'none',
                duration: 1500
              })
            } else if (res.data.code == ACCESS_ERROR) {
              wx.showToast({
                title: 'Ȩ�޲���',
                icon: 'none',
                duration: 1500
              })
            } else if (res.data.code == REMOTE_ERROR) {
              wx.showToast({
                title: 'Զ�̵���ʧ��',
                icon: 'none',
                duration: 1500
              })
            } else if (res.data.code == REPE_EOOR) {
              wx.showToast({
                title: '�ظ�����',
                icon: 'none',
                duration: 1500
              })
            }
          }
        } else {
          reject(res.data.data)
        }
      },
      fail: function (res) {
        reject(res.data)
      }
    })
  })
}
export default request