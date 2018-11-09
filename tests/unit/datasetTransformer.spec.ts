describe(`sample`, () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4)
  })
})
// import moment from 'moment'
// import {OaData} from 'simplidata'
//
// const entry = [
//   new OaData(moment('january 2014').format(), 3836.37), new OaData(moment('february 2014').format(), 3862.84), new OaData(moment('march 2014').format(), 3898.38), new OaData(moment('april 2014').format(), 3924.5), new OaData(moment('may 2014').format(), 3942.55), new OaData(moment('june 2014').format(), 3958.32), new OaData(moment('july 2014').format(), 3958.72), new OaData(moment('august 2014').format(), 3968.62), new OaData(moment('september 2014').format(), 3991.24), new OaData(moment('october 2014').format(), 4008), new OaData(moment('november 2014').format(), 4028.44), new OaData(moment('december 2014').format(), 4059.86),
//   new OaData(moment('january 2015').format(), 4110.2), new OaData(moment('february 2015').format(), 4160.34), new OaData(moment('march 2015').format(), 4215.26), new OaData(moment('april 2015').format(), 4245.19), new OaData(moment('may 2015').format(), 4276.6), new OaData(moment('june 2015').format(), 4310.39), new OaData(moment('july 2015').format(), 4337.11), new OaData(moment('august 2015').format(), 4346.65), new OaData(moment('september 2015').format(), 4370.12), new OaData(moment('october 2015').format(), 4405.95), new OaData(moment('november 2015').format(), 4450.45), new OaData(moment('december 2015').format(), 4493.17),
// ]
//
// describe(`datasetTransformer`, () => {
//   it('sums', () => {
//     const listOfDataList = [
//       [new OaData('a', 1), new OaData('b', 2), new OaData('c', 3), new OaData('d', 4)],
//       [new OaData('b', 1), new OaData('c', 2), new OaData('d', 3), new OaData('e', 4)],
//       [new OaData('z', 1), new OaData('a', 1), new OaData('b', 1), new OaData('c', 1)],
//     ]
//     const expected = [new OaData('a', 2), new OaData('b', 4), new OaData('c', 6), new OaData('d', 7)]
//     const result = sum(listOfDataList)
//     expect(result).toBe(expected)
//   })
//
//   it('differential', () => {
//     const expected = [
//       new OaData(moment('january 2014').format(), 0), new OaData(moment('february 2014').format(), 26.4700000000003), new OaData(moment('march 2014').format(), 35.54), new OaData(moment('april 2014').format(), 26.1199999999999), new OaData(moment('may 2014').format(), 18.0500000000002), new OaData(moment('june 2014').format(), 15.77), new OaData(moment('july 2014').format(), 0.399999999999636), new OaData(moment('august 2014').format(), 9.90000000000009), new OaData(moment('september 2014').format(), 22.6199999999999), new OaData(moment('october 2014').format(), 16.7600000000002), new OaData(moment('november 2014').format(), 20.4400000000001), new OaData(moment('december 2014').format(), 31.4200000000001),
//       new OaData(moment('january 2015').format(), 50.3399999999997), new OaData(moment('february 2015').format(), 50.1400000000003), new OaData(moment('march 2015').format(), 54.9200000000001), new OaData(moment('april 2015').format(), 29.9299999999994), new OaData(moment('may 2015').format(), 31.4100000000008), new OaData(moment('june 2015').format(), 33.79), new OaData(moment('july 2015').format(), 26.7199999999993), new OaData(moment('august 2015').format(), 9.53999999999996), new OaData(moment('september 2015').format(), 23.4700000000003), new OaData(moment('october 2015').format(), 35.8299999999999), new OaData(moment('november 2015').format(), 44.5), new OaData(moment('december 2015').format(), 42.7200000000003),
//     ]
//     const result = differential(entry)
//     expect(result).toBe(expected)
//   })
//
//   it('periodOverPeriodVariation', () => {
//     const expected = [new OaData(moment('january 2014').format(), 0), new OaData(moment('february 2014').format(), 0.0069), new OaData(moment('march 2014').format(), 0.0092), new OaData(moment('april 2014').format(), 0.0067), new OaData(moment('may 2014').format(), 0.0046)]
//     const result = periodOverPeriodVariation(entry)
//     expect(result).toBe(expected)
//   })
//
//   it('monthSpaceVariation', () => {
//     const expected = [
//       new OaData(moment('january 2014').format(), 0), new OaData(moment('february 2014').format(), 0), new OaData(moment('march 2014').format(), 0), new OaData(moment('april 2014').format(), 0), new OaData(moment('may 2014').format(), 0), new OaData(moment('june 2014').format(), 0), new OaData(moment('july 2014').format(), 0), new OaData(moment('august 2014').format(), 0), new OaData(moment('september 2014').format(), 0), new OaData(moment('october 2014').format(), 0), new OaData(moment('november 2014').format(), 0), new OaData(moment('december 2014').format(), 0),
//       new OaData(moment('january 2015').format(), 0.0714), new OaData(moment('february 2015').format(), 0.0770), new OaData(moment('march 2015').format(), 0.0813), new OaData(moment('april 2015').format(), 0.0817), new OaData(moment('may 2015').format(), 0.0847), new OaData(moment('june 2015').format(), 0.0889), new OaData(moment('july 2015').format(), 0.0956), new OaData(moment('august 2015').format(), 0.0953), new OaData(moment('september 2015').format(), 0.0949), new OaData(moment('october 2015').format(), 0.0993), new OaData(moment('november 2015').format(), 0.1048), new OaData(moment('december 2015').format(), 0.1067),
//     ]
//     const result = monthSpaceVariation(entry, 12)
//     expect(result).toBe(expected)
//   })
//
//   it('avgTotal', () => {
//     const avgEntry = [new OaData('a', 1), new OaData('a', 1), new OaData('b', 2), new OaData('c', 3), new OaData('d', 4)]
//     const expected = [new OaData('a', 2.2), new OaData('a', 2.2), new OaData('b', 2.2), new OaData('c', 2.2), new OaData('d', 2.2)]
//     const result = avgTotal(avgEntry)
//     expect(result).toBe(expected)
//   })
//
//   it('medianTotal', () => {
//     const medianEntry = [new OaData('a', 1), new OaData('a', 1), new OaData('b', 2), new OaData('c', 3), new OaData('d', 4)]
//     const expected = [new OaData('a', 2), new OaData('a', 2), new OaData('b', 2), new OaData('c', 2), new OaData('d', 2)]
//     const result = medianTotal(medianEntry)
//     expect(result).toBe(expected)
//   })
//
//   it('standardDeviation', () => {
//     const standardDeviationEntry = [new OaData('a', 10), new OaData('a2', 11), new OaData('b', 12), new OaData('c', 13), new OaData('d', 14), new OaData('d', 15)]
//     const expected = [new OaData('a', 1.707825127659933), new OaData('a2', 1.707825127659933), new OaData('b', 1.707825127659933), new OaData('c', 1.707825127659933), new OaData('d', 1.707825127659933)]
//     const result = standardDeviation(standardDeviationEntry)
//     expect(result).toBe(expected)
//   })
//
//   it('mode', () => {
//     const modeEntry = [new OaData('a', 10), new OaData('a2', 10), new OaData('b', 12), new OaData('c', 12), new OaData('d', 12), new OaData('d', 13)]
//     const expected = [new OaData('a', 12), new OaData('a2', 12), new OaData('b', 12), new OaData('c', 12), new OaData('d', 12)]
//     const result = mode(modeEntry)
//     expect(result).toBe(expected)
//   })
//
//   it('movingAvg', () => {
//     const expected = [
//       new OaData(moment('january 2014').format(), 0), new OaData(moment('february 2014').format(), 0), new OaData(moment('march 2014').format(), 3865.86333333333), new OaData(moment('april 2014').format(), 3895.24), new OaData(moment('may 2014').format(), 3921.81), new OaData(moment('june 2014').format(), 3941.79), new OaData(moment('july 2014').format(), 3953.19666666667), new OaData(moment('august 2014').format(), 3961.88666666667), new OaData(moment('september 2014').format(), 3972.86), new OaData(moment('october 2014').format(), 3989.28666666667), new OaData(moment('november 2014').format(), 4009.22666666667), new OaData(moment('december 2014').format(), 4032.1),
//       new OaData(moment('january 2015').format(), 4066.16666666667), new OaData(moment('february 2015').format(), 4110.13333333333), new OaData(moment('march 2015').format(), 4161.93333333333), new OaData(moment('april 2015').format(), 4206.93), new OaData(moment('may 2015').format(), 4245.68333333333), new OaData(moment('june 2015').format(), 4277.39333333333), new OaData(moment('july 2015').format(), 4308.03333333333), new OaData(moment('august 2015').format(), 4331.38333333333), new OaData(moment('september 2015').format(), 4351.29333333333), new OaData(moment('october 2015').format(), 4374.24), new OaData(moment('november 2015').format(), 4408.84), new OaData(moment('december 2015').format(), 4449.85666666667)
//     ]
//     const result = movingAvg(entry, 3)
//     expect(result).toBe(expected)
//   })
//
//   it('cagr', () => {
//     const expected = [
//       new OaData(moment('january 2014').format(), 0), new OaData(moment('february 2014').format(), 0), new OaData(moment('march 2014').format(), 0), new OaData(moment('april 2014').format(), 0), new OaData(moment('may 2014').format(), 0), new OaData(moment('june 2014').format(), 0), new OaData(moment('july 2014').format(), 0), new OaData(moment('august 2014').format(), 0), new OaData(moment('september 2014').format(), 0), new OaData(moment('october 2014').format(), 0), new OaData(moment('november 2014').format(), 0), new OaData(moment('december 2014').format(), 0),
//       new OaData(moment('january 2015').format(), 0.0057), new OaData(moment('february 2015').format(), 0.0059), new OaData(moment('march 2015').format(), 0.0065), new OaData(moment('april 2015').format(), 0.0067), new OaData(moment('may 2015').format(), 0.0071), new OaData(moment('june 2015').format(), 0.0078), new OaData(moment('july 2015').format(), 0.0081), new OaData(moment('august 2015').format(), 0.0078), new OaData(moment('september 2015').format(), 0.0079), new OaData(moment('october 2015').format(), 0.0082), new OaData(moment('november 2015').format(), 0.0084), new OaData(moment('december 2015').format(), 0.0081)
//     ]
//     const result = cagr(entry, 12)
//     expect(result).toBe(expected)
//   })
// })
