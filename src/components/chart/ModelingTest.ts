import { ForecastConfig, ItemRFU, Model, ModelingRequest, ModelingResult, ModelRFU, OaData } from '../../models'

async function hey() {
  const itemsRaw = [
    {
      dataListRFU: [
        {
          dt: 'Jan-03',
          value: 96.2,
        },
        {
          dt: 'Feb-03',
          value: 98.7,
        },
        {
          dt: 'Mar-03',
          value: 103.4,
        },
        {
          dt: 'Apr-03',
          value: 102.2,
        },
        {
          dt: 'May-03',
          value: 100.3,
        },
        {
          dt: 'Jun-03',
          value: 98.6,
        },
        {
          dt: 'Jul-03',
          value: 103.1,
        },
        {
          dt: 'Aug-03',
          value: 101.5,
        },
        {
          dt: 'Sep-03',
          value: 102.9,
        },
        {
          dt: 'Oct-03',
          value: 105.1,
        },
        {
          dt: 'Nov-03',
          value: 102,
        },
        {
          dt: 'Dec-03',
          value: 99.7,
        },
        {
          dt: 'Jan-04',
          value: 98.6,
        },
        {
          dt: 'Feb-04',
          value: 99.5,
        },
        {
          dt: 'Mar-04',
          value: 112,
        },
        {
          dt: 'Apr-04',
          value: 107.4,
        },
        {
          dt: 'May-04',
          value: 106,
        },
        {
          dt: 'Jun-04',
          value: 107,
        },
        {
          dt: 'Jul-04',
          value: 111.5,
        },
        {
          dt: 'Aug-04',
          value: 110.7,
        },
        {
          dt: 'Sep-04',
          value: 109.2,
        },
        {
          dt: 'Oct-04',
          value: 108.9,
        },
        {
          dt: 'Nov-04',
          value: 109.6,
        },
        {
          dt: 'Dec-04',
          value: 107.6,
        },
        {
          dt: 'Jan-05',
          value: 103.5,
        },
        {
          dt: 'Feb-05',
          value: 104,
        },
        {
          dt: 'Mar-05',
          value: 115.4,
        },
        {
          dt: 'Apr-05',
          value: 112.4,
        },
        {
          dt: 'May-05',
          value: 110.9,
        },
        {
          dt: 'Jun-05',
          value: 111.5,
        },
        {
          dt: 'Jul-05',
          value: 113.2,
        },
        {
          dt: 'Aug-05',
          value: 115.2,
        },
        {
          dt: 'Sep-05',
          value: 111,
        },
        {
          dt: 'Oct-05',
          value: 111.3,
        },
        {
          dt: 'Nov-05',
          value: 111.7,
        },
        {
          dt: 'Dec-05',
          value: 111.3,
        },
        {
          dt: 'Jan-06',
          value: 108.6,
        },
        {
          dt: 'Feb-06',
          value: 107.8,
        },
        {
          dt: 'Mar-06',
          value: 119.1,
        },
        {
          dt: 'Apr-06',
          value: 112.6,
        },
        {
          dt: 'May-06',
          value: 117.2,
        },
        {
          dt: 'Jun-06',
          value: 114.4,
        },
        {
          dt: 'Jul-06',
          value: 119.4,
        },
        {
          dt: 'Aug-06',
          value: 121.1,
        },
        {
          dt: 'Sep-06',
          value: 116.2,
        },
        {
          dt: 'Oct-06',
          value: 119.3,
        },
        {
          dt: 'Nov-06',
          value: 118.7,
        },
        {
          dt: 'Dec-06',
          value: 116.3,
        },
        {
          dt: 'Jan-07',
          value: 114.8,
        },
        {
          dt: 'Feb-07',
          value: 113.3,
        },
        {
          dt: 'Mar-07',
          value: 125.1,
        },
        {
          dt: 'Apr-07',
          value: 120.3,
        },
        {
          dt: 'May-07',
          value: 123.9,
        },
        {
          dt: 'Jun-07',
          value: 122.4,
        },
        {
          dt: 'Jul-07',
          value: 127.9,
        },
        {
          dt: 'Aug-07',
          value: 129.1,
        },
        {
          dt: 'Sep-07',
          value: 123.2,
        },
        {
          dt: 'Oct-07',
          value: 129.2,
        },
        {
          dt: 'Nov-07',
          value: 125.9,
        },
        {
          dt: 'Dec-07',
          value: 122.4,
        },
        {
          dt: 'Jan-08',
          value: 121.9,
        },
        {
          dt: 'Feb-08',
          value: 121.9,
        },
        {
          dt: 'Mar-08',
          value: 129,
        },
        {
          dt: 'Apr-08',
          value: 129.5,
        },
        {
          dt: 'May-08',
          value: 128.9,
        },
        {
          dt: 'Jun-08',
          value: 130.6,
        },
        {
          dt: 'Jul-08',
          value: 136.5,
        },
        {
          dt: 'Aug-08',
          value: 133.9,
        },
        {
          dt: 'Sep-08',
          value: 132.6,
        },
        {
          dt: 'Oct-08',
          value: 132.8,
        },
        {
          dt: 'Nov-08',
          value: 124.6,
        },
        {
          dt: 'Dec-08',
          value: 118.9,
        },
        {
          dt: 'Jan-09',
          value: 115.2,
        },
        {
          dt: 'Feb-09',
          value: 115.3,
        },
        {
          dt: 'Mar-09',
          value: 127.8,
        },
        {
          dt: 'Apr-09',
          value: 123.1,
        },
        {
          dt: 'May-09',
          value: 124.4,
        },
        {
          dt: 'Jun-09',
          value: 125.6,
        },
        {
          dt: 'Jul-09',
          value: 131.4,
        },
        {
          dt: 'Aug-09',
          value: 130.7,
        },
        {
          dt: 'Sep-09',
          value: 129.8,
        },
        {
          dt: 'Oct-09',
          value: 132.5,
        },
        {
          dt: 'Nov-09',
          value: 129.6,
        },
        {
          dt: 'Dec-09',
          value: 129.2,
        },
        {
          dt: 'Jan-10',
          value: 125.8,
        },
        {
          dt: 'Feb-10',
          value: 127.6,
        },
        {
          dt: 'Mar-10',
          value: 143.4,
        },
        {
          dt: 'Apr-10',
          value: 136.9,
        },
        {
          dt: 'May-10',
          value: 136.5,
        },
        {
          dt: 'Jun-10',
          value: 136.1,
        },
        {
          dt: 'Jul-10',
          value: 141.6,
        },
        {
          dt: 'Aug-10',
          value: 141.6,
        },
        {
          dt: 'Sep-10',
          value: 139.5,
        },
        {
          dt: 'Oct-10',
          value: 139.3,
        },
        {
          dt: 'Nov-10',
          value: 139.7,
        },
        {
          dt: 'Dec-10',
          value: 136.7,
        },
        {
          dt: 'Jan-11',
          value: 132.7,
        },
        {
          dt: 'Feb-11',
          value: 136.2,
        },
        {
          dt: 'Mar-11',
          value: 144.9,
        },
        {
          dt: 'Apr-11',
          value: 139.9,
        },
        {
          dt: 'May-11',
          value: 143.2,
        },
        {
          dt: 'Jun-11',
          value: 141.8,
        },
        {
          dt: 'Jul-11',
          value: 145.2,
        },
        {
          dt: 'Aug-11',
          value: 147.5,
        },
        {
          dt: 'Sep-11',
          value: 142.3,
        },
        {
          dt: 'Oct-11',
          value: 142,
        },
        {
          dt: 'Nov-11',
          value: 141.9,
        },
        {
          dt: 'Dec-11',
          value: 139.2,
        },
        {
          dt: 'Jan-12',
          value: 133.3,
        },
        {
          dt: 'Feb-12',
          value: 135.4,
        },
        {
          dt: 'Mar-12',
          value: 146.4,
        },
        {
          dt: 'Apr-12',
          value: 139.9,
        },
        {
          dt: 'May-12',
          value: 144.6,
        },
        {
          dt: 'Jun-12',
          value: 142.3,
        },
        {
          dt: 'Jul-12',
          value: 147.5,
        },
        {
          dt: 'Aug-12',
          value: 149.9,
        },
        {
          dt: 'Sep-12',
          value: 141.6,
        },
        {
          dt: 'Oct-12',
          value: 147.7,
        },
        {
          dt: 'Nov-12',
          value: 144.2,
        },
        {
          dt: 'Dec-12',
          value: 139.5,
        },
        {
          dt: 'Jan-13',
          value: 139.3,
        },
        {
          dt: 'Feb-13',
          value: 136.1,
        },
        {
          dt: 'Mar-13',
          value: 148,
        },
        {
          dt: 'Apr-13',
          value: 149.8,
        },
        {
          dt: 'May-13',
          value: 147,
        },
        {
          dt: 'Jun-13',
          value: 144.9,
        },
        {
          dt: 'Jul-13',
          value: 152.1,
        },
        {
          dt: 'Aug-13',
          value: 151.8,
        },
        {
          dt: 'Sep-13',
          value: 147.3,
        },
        {
          dt: 'Oct-13',
          value: 151.9,
        },
        {
          dt: 'Nov-13',
          value: 147.8,
        },
        {
          dt: 'Dec-13',
          value: 145.8,
        },
        {
          dt: 'Jan-14',
          value: 142.7,
        },
        {
          dt: 'Feb-14',
          value: 143.5,
        },
        {
          dt: 'Mar-14',
          value: 149,
        },
        {
          dt: 'Apr-14',
          value: 147.7,
        },
        {
          dt: 'May-14',
          value: 147.1,
        },
        {
          dt: 'Jun-14',
          value: 140.9,
        },
        {
          dt: 'Jul-14',
          value: 149.9,
        },
        {
          dt: 'Aug-14',
          value: 148.3,
        },
        {
          dt: 'Sep-14',
          value: 148.1,
        },
        {
          dt: 'Oct-14',
          value: 149.7,
        },
        {
          dt: 'Nov-14',
          value: 144.9,
        },
        {
          dt: 'Dec-14',
          value: 145.5,
        },
        {
          dt: 'Jan-15',
          value: 139.2,
        },
        {
          dt: 'Feb-15',
          value: 136.9,
        },
        {
          dt: 'Mar-15',
          value: 150.1,
        },
        {
          dt: 'Apr-15',
          value: 142.8,
        },
        {
          dt: 'May-15',
          value: 140.2,
        },
        {
          dt: 'Jun-15',
          value: 139.1,
        },
        {
          dt: 'Jul-15',
          value: 143.6,
        },
        {
          dt: 'Aug-15',
          value: 141.2,
        },
        {
          dt: 'Sep-15',
          value: 138.6,
        },
        {
          dt: 'Oct-15',
          value: 140.5,
        },
        {
          dt: 'Nov-15',
          value: 136.2,
        },
        {
          dt: 'Dec-15',
          value: 136.5,
        },
        {
          dt: 'Jan-16',
          value: 128.7,
        },
        {
          dt: 'Feb-16',
          value: 131.2,
        },
        {
          dt: 'Mar-16',
          value: 141,
        },
        {
          dt: 'Apr-16',
          value: 136.5,
        },
        {
          dt: 'May-16',
          value: 134.1,
        },
        {
          dt: 'Jun-16',
          value: 136,
        },
        {
          dt: 'Jul-16',
          value: 137.1,
        },
        {
          dt: 'Aug-16',
          value: 138.6,
        },
        {
          dt: 'Sep-16',
          value: 134.6,
        },
        {
          dt: 'Oct-16',
          value: 133.2,
        },
        {
          dt: 'Nov-16',
          value: 132.9,
        },
        {
          dt: 'Dec-16',
          value: 133.9,
        },
        {
          dt: 'Jan-17',
          value: 129.4,
        },
        {
          dt: 'Feb-17',
          value: 130.6,
        },
        {
          dt: 'Mar-17',
          value: 143.4,
        },
        {
          dt: 'Apr-17',
          value: 134.7,
        },
        {
          dt: 'May-17',
          value: 136.8,
        },
        {
          dt: 'Jun-17',
          value: 135.5,
        },
        {
          dt: 'Jul-17',
          value: 138.6,
        },
        {
          dt: 'Aug-17',
          value: 140.6,
        },
        {
          dt: 'Sep-17',
          value: 135.5,
        },
        {
          dt: 'Oct-17',
          value: 136.7,
        },
        {
          dt: 'Nov-17',
          value: 136.1,
        },
        {
          dt: 'Dec-17',
          value: 136.7,
        },
        {
          dt: 'Jan-18',
          value: 132.93,
        },
        {
          dt: 'Feb-18',
          value: 131.32,
        },
        {
          dt: 'Mar-18',
          value: 142.55,
        },
        {
          dt: 'Apr-18',
          value: 139.74,
        },
        {
          dt: 'May-18',
          value: 132.83,
        },
        {
          dt: 'Jun-18',
          value: 137.95,
        },
        {
          dt: 'Jul-18',
          value: 142.1,
        },
        {
          dt: 'Aug-18',
          value: 144.11,
        },
        {
          dt: 'Sep-18',
          value: 148.11,
        },
        {
          dt: 'Out-18',
          value: null,
        },
      ],
    },
    {
      dataListRFU: [
        {
          dt: 'Jan-03',
          value: 74,
        },
        {
          dt: 'Feb-03',
          value: 71.8,
        },
        {
          dt: 'Mar-03',
          value: 77.4,
        },
        {
          dt: 'Apr-03',
          value: 76.5,
        },
        {
          dt: 'May-03',
          value: 79.7,
        },
        {
          dt: 'Jun-03',
          value: 76.3,
        },
        {
          dt: 'Jul-03',
          value: 81.3,
        },
        {
          dt: 'Aug-03',
          value: 81.6,
        },
        {
          dt: 'Sep-03',
          value: 85.7,
        },
        {
          dt: 'Oct-03',
          value: 90,
        },
        {
          dt: 'Nov-03',
          value: 84.6,
        },
        {
          dt: 'Dec-03',
          value: 77.9,
        },
        {
          dt: 'Jan-04',
          value: 76.8,
        },
        {
          dt: 'Feb-04',
          value: 74,
        },
        {
          dt: 'Mar-04',
          value: 86.9,
        },
        {
          dt: 'Apr-04',
          value: 82.2,
        },
        {
          dt: 'May-04',
          value: 86.3,
        },
        {
          dt: 'Jun-04',
          value: 86.1,
        },
        {
          dt: 'Jul-04',
          value: 90.1,
        },
        {
          dt: 'Aug-04',
          value: 92.1,
        },
        {
          dt: 'Sep-04',
          value: 92.1,
        },
        {
          dt: 'Oct-04',
          value: 93.5,
        },
        {
          dt: 'Nov-04',
          value: 91.8,
        },
        {
          dt: 'Dec-04',
          value: 84.7,
        },
        {
          dt: 'Jan-05',
          value: 81,
        },
        {
          dt: 'Feb-05',
          value: 76.4,
        },
        {
          dt: 'Mar-05',
          value: 88,
        },
        {
          dt: 'Apr-05',
          value: 87,
        },
        {
          dt: 'May-05',
          value: 91.1,
        },
        {
          dt: 'Jun-05',
          value: 91.4,
        },
        {
          dt: 'Jul-05',
          value: 90.5,
        },
        {
          dt: 'Aug-05',
          value: 95.6,
        },
        {
          dt: 'Sep-05',
          value: 92,
        },
        {
          dt: 'Oct-05',
          value: 93.7,
        },
        {
          dt: 'Nov-05',
          value: 92.4,
        },
        {
          dt: 'Dec-05',
          value: 86.6,
        },
        {
          dt: 'Jan-06',
          value: 83.7,
        },
        {
          dt: 'Feb-06',
          value: 80.2,
        },
        {
          dt: 'Mar-06',
          value: 92.4,
        },
        {
          dt: 'Apr-06',
          value: 85.7,
        },
        {
          dt: 'May-06',
          value: 95.4,
        },
        {
          dt: 'Jun-06',
          value: 91.1,
        },
        {
          dt: 'Jul-06',
          value: 93.8,
        },
        {
          dt: 'Aug-06',
          value: 98.6,
        },
        {
          dt: 'Sep-06',
          value: 93.2,
        },
        {
          dt: 'Oct-06',
          value: 97.5,
        },
        {
          dt: 'Nov-06',
          value: 95.9,
        },
        {
          dt: 'Dec-06',
          value: 87,
        },
        {
          dt: 'Jan-07',
          value: 87,
        },
        {
          dt: 'Feb-07',
          value: 82.6,
        },
        {
          dt: 'Mar-07',
          value: 96.4,
        },
        {
          dt: 'Apr-07',
          value: 90.6,
        },
        {
          dt: 'May-07',
          value: 99.9,
        },
        {
          dt: 'Jun-07',
          value: 96.9,
        },
        {
          dt: 'Jul-07',
          value: 99.8,
        },
        {
          dt: 'Aug-07',
          value: 104.9,
        },
        {
          dt: 'Sep-07',
          value: 98.4,
        },
        {
          dt: 'Oct-07',
          value: 107.8,
        },
        {
          dt: 'Nov-07',
          value: 102.4,
        },
        {
          dt: 'Dec-07',
          value: 92.6,
        },
        {
          dt: 'Jan-08',
          value: 94.8,
        },
        {
          dt: 'Feb-08',
          value: 91.1,
        },
        {
          dt: 'Mar-08',
          value: 97.7,
        },
        {
          dt: 'Apr-08',
          value: 99.2,
        },
        {
          dt: 'May-08',
          value: 102.5,
        },
        {
          dt: 'Jun-08',
          value: 103.3,
        },
        {
          dt: 'Jul-08',
          value: 108.5,
        },
        {
          dt: 'Aug-08',
          value: 106.9,
        },
        {
          dt: 'Sep-08',
          value: 107.3,
        },
        {
          dt: 'Oct-08',
          value: 108.4,
        },
        {
          dt: 'Nov-08',
          value: 96.2,
        },
        {
          dt: 'Dec-08',
          value: 79.1,
        },
        {
          dt: 'Jan-09',
          value: 78.7,
        },
        {
          dt: 'Feb-09',
          value: 76.1,
        },
        {
          dt: 'Mar-09',
          value: 88.6,
        },
        {
          dt: 'Apr-09',
          value: 85.2,
        },
        {
          dt: 'May-09',
          value: 91.3,
        },
        {
          dt: 'Jun-09',
          value: 92.2,
        },
        {
          dt: 'Jul-09',
          value: 97.7,
        },
        {
          dt: 'Aug-09',
          value: 99.6,
        },
        {
          dt: 'Sep-09',
          value: 99.4,
        },
        {
          dt: 'Oct-09',
          value: 105.6,
        },
        {
          dt: 'Nov-09',
          value: 101.4,
        },
        {
          dt: 'Dec-09',
          value: 94.1,
        },
        {
          dt: 'Jan-10',
          value: 91.2,
        },
        {
          dt: 'Feb-10',
          value: 89,
        },
        {
          dt: 'Mar-10',
          value: 105.1,
        },
        {
          dt: 'Apr-10',
          value: 99.3,
        },
        {
          dt: 'May-10',
          value: 104.3,
        },
        {
          dt: 'Jun-10',
          value: 102.5,
        },
        {
          dt: 'Jul-10',
          value: 106.9,
        },
        {
          dt: 'Aug-10',
          value: 108.1,
        },
        {
          dt: 'Sep-10',
          value: 105.8,
        },
        {
          dt: 'Oct-10',
          value: 107.7,
        },
        {
          dt: 'Nov-10',
          value: 106.8,
        },
        {
          dt: 'Dec-10',
          value: 96.6,
        },
        {
          dt: 'Jan-11',
          value: 93.2,
        },
        {
          dt: 'Feb-11',
          value: 95.4,
        },
        {
          dt: 'Mar-11',
          value: 104.4,
        },
        {
          dt: 'Apr-11',
          value: 97.5,
        },
        {
          dt: 'May-11',
          value: 107.1,
        },
        {
          dt: 'Jun-11',
          value: 102.8,
        },
        {
          dt: 'Jul-11',
          value: 106.1,
        },
        {
          dt: 'Aug-11',
          value: 110.8,
        },
        {
          dt: 'Sep-11',
          value: 104.8,
        },
        {
          dt: 'Oct-11',
          value: 106.3,
        },
        {
          dt: 'Nov-11',
          value: 104.2,
        },
        {
          dt: 'Dec-11',
          value: 95.7,
        },
        {
          dt: 'Jan-12',
          value: 88.7,
        },
        {
          dt: 'Feb-12',
          value: 89.8,
        },
        {
          dt: 'Mar-12',
          value: 99.7,
        },
        {
          dt: 'Apr-12',
          value: 92.8,
        },
        {
          dt: 'May-12',
          value: 102.5,
        },
        {
          dt: 'Jun-12',
          value: 98.3,
        },
        {
          dt: 'Jul-12',
          value: 104.5,
        },
        {
          dt: 'Aug-12',
          value: 111.5,
        },
        {
          dt: 'Sep-12',
          value: 103.4,
        },
        {
          dt: 'Oct-12',
          value: 111.8,
        },
        {
          dt: 'Nov-12',
          value: 104.8,
        },
        {
          dt: 'Dec-12',
          value: 92.2,
        },
        {
          dt: 'Jan-13',
          value: 94.5,
        },
        {
          dt: 'Feb-13',
          value: 88.1,
        },
        {
          dt: 'Mar-13',
          value: 97.7,
        },
        {
          dt: 'Apr-13',
          value: 101.8,
        },
        {
          dt: 'May-13',
          value: 105,
        },
        {
          dt: 'Jun-13',
          value: 101.7,
        },
        {
          dt: 'Jul-13',
          value: 108,
        },
        {
          dt: 'Aug-13',
          value: 112,
        },
        {
          dt: 'Sep-13',
          value: 107.3,
        },
        {
          dt: 'Oct-13',
          value: 112.6,
        },
        {
          dt: 'Nov-13',
          value: 106.1,
        },
        {
          dt: 'Dec-13',
          value: 90.1,
        },
        {
          dt: 'Jan-14',
          value: 92.6,
        },
        {
          dt: 'Feb-14',
          value: 92.3,
        },
        {
          dt: 'Mar-14',
          value: 97.3,
        },
        {
          dt: 'Apr-14',
          value: 96,
        },
        {
          dt: 'May-14',
          value: 101.7,
        },
        {
          dt: 'Jun-14',
          value: 94.9,
        },
        {
          dt: 'Jul-14',
          value: 104.4,
        },
        {
          dt: 'Aug-14',
          value: 106.3,
        },
        {
          dt: 'Sep-14',
          value: 105.6,
        },
        {
          dt: 'Oct-14',
          value: 109.3,
        },
        {
          dt: 'Nov-14',
          value: 99.8,
        },
        {
          dt: 'Dec-14',
          value: 87.7,
        },
        {
          dt: 'Jan-15',
          value: 88.1,
        },
        {
          dt: 'Feb-15',
          value: 83.7,
        },
        {
          dt: 'Mar-15',
          value: 94.3,
        },
        {
          dt: 'Apr-15',
          value: 88.8,
        },
        {
          dt: 'May-15',
          value: 93.1,
        },
        {
          dt: 'Jun-15',
          value: 92.5,
        },
        {
          dt: 'Jul-15',
          value: 95.5,
        },
        {
          dt: 'Aug-15',
          value: 97.6,
        },
        {
          dt: 'Sep-15',
          value: 94.3,
        },
        {
          dt: 'Oct-15',
          value: 97.2,
        },
        {
          dt: 'Nov-15',
          value: 87.6,
        },
        {
          dt: 'Dec-15',
          value: 77.2,
        },
        {
          dt: 'Jan-16',
          value: 76.3,
        },
        {
          dt: 'Feb-16',
          value: 75.8,
        },
        {
          dt: 'Mar-16',
          value: 83.7,
        },
        {
          dt: 'Apr-16',
          value: 83,
        },
        {
          dt: 'May-16',
          value: 86.3,
        },
        {
          dt: 'Jun-16',
          value: 87.7,
        },
        {
          dt: 'Jul-16',
          value: 89.6,
        },
        {
          dt: 'Aug-16',
          value: 93,
        },
        {
          dt: 'Sep-16',
          value: 90.7,
        },
        {
          dt: 'Oct-16',
          value: 90.2,
        },
        {
          dt: 'Nov-16',
          value: 86.5,
        },
        {
          dt: 'Dec-16',
          value: 77.2,
        },
        {
          dt: 'Jan-17',
          value: 77.9,
        },
        {
          dt: 'Feb-17',
          value: 75.9,
        },
        {
          dt: 'Mar-17',
          value: 85.5,
        },
        {
          dt: 'Apr-17',
          value: 79.4,
        },
        {
          dt: 'May-17',
          value: 90.2,
        },
        {
          dt: 'Jun-17',
          value: 88.5,
        },
        {
          dt: 'Jul-17',
          value: 92.2,
        },
        {
          dt: 'Aug-17',
          value: 96.7,
        },
        {
          dt: 'Sep-17',
          value: 93,
        },
        {
          dt: 'Oct-17',
          value: 95.1,
        },
        {
          dt: 'Nov-17',
          value: 90.7,
        },
        {
          dt: 'Dec-17',
          value: 80.9,
        },
        {
          dt: 'Jan-18',
          value: 82.4,
        },
        {
          dt: 'Feb-18',
          value: 77.3,
        },
        {
          dt: 'Mar-18',
          value: 86.4,
        },
        {
          dt: 'Apr-18',
          value: 86.6,
        },
        {
          dt: 'May-18',
          value: 84.4,
        },
        {
          dt: 'Jun-18',
          value: 91.4,
        },
        {
          dt: 'Jul-18',
          value: 96,
        },
        {
          dt: 'Aug-18',
          value: 98.3,
        },
        {
          dt: 'Sep-18',
          value: 91.1,
        },
        {
          dt: 'Out-18',
          value: 95.1,
        },
      ],
    },
  ]

  const req = new ModelingRequest()
  req.forecastConfig = new ForecastConfig()
  req.forecastConfig.start = '2014-01-01T00:00:00-02'
  req.forecastConfig.end = '2014-01-01T00:00:00-02'
  req.forecastConfig.forecastType = 3
  req.forecastConfig.stepsAhead = 2
  req.forecastConfig.numberOfPreForecastObservationsToGraph = 1
  req.forecastConfig.showFittedValuesForPreForecastRange = true
  req.forecastConfig.confidenceInterval = 4.5
  req.forecastConfig.plotConfidenceIntervalAs = 3
  const model = new Model()
  model.idModelPk = 1
  const itemsRFU: ItemRFU[] = itemsRaw.map(ir => {
    const itemrfu = new ItemRFU()
    itemrfu.dataListRFU = ir.dataListRFU.map(dr => {
      const data = new OaData()
      data.dt = dr.dt
      data.value = dr.value
      return data
    })
    return itemrfu
  })

  req.modelRFU = new ModelRFU(model, itemsRFU)
  const res = new ModelingResult()
  await res.get(req)
  console.log(res)
}

export default hey
