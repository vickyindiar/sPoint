const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname.includes('testapp') ||
     // [::1] is the IPv6 localhost address.
     window.location.hostname === '[::1]' ||
     // 127.0.0.1/8 is considered localhost for IPv4.
     window.location.hostname.match(
       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
     )
  );
  
  const version = process.env.REACT_APP_APIVERSION.substring(0, process.env.REACT_APP_APIVERSION.indexOf('.'))
  module.exports = {
    google: {
  
    },
    facebook: {
      APP_ID: "",
    },
    baseURL:  isLocalhost ? 'http://localhost:5000/' : '/',
    apiURL: isLocalhost ? `http://localhost:5000/api/v${version}/`: `/api/v${version}/`,
    apiAdminURL:  isLocalhost ? `http://localhost:5000/api/v${version}/admin/`: `/api/v${version}/admin/`,
  }