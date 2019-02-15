import moment from 'moment'

export default {
    filters: {
      set_filter(value, filter) {
        if (value == null) {
          return null
        }
        if (filter === 'YMDHms') {
          return moment(value).format('YYYY/MM/DD HH:mm:ss')
        }
        if (filter === 'YMDHm') {
          return moment(value).format('YYYY/MM/DD HH:mm')
        }
        if (filter === 'YMD') {
          return moment(value).format('YYYY/MM/DD')
        }
        if (filter === 'YM') {
          return moment(value).format('YYYY/MM')
        }
        if (filter === 'number_format') {
          return value.toLocaleString('ja-JP')
        }
        return value
      }
    }
}
