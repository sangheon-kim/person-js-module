'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * @description 달력 리턴 관련
 * @author Sangheon Kim  (ksj8367@gmail.com)
 * @createdBy 20200816
 */
var calendar = {
    isMonthSlice: true,
    lang: "ko",
    setMonthSlice: function (bool) {
        this.isMonthSlice = bool;
    },
    setLang: function (lang) {
        if (lang === void 0) { lang = "ko"; }
        this.lang = lang;
    },
    get_year: function (src) {
        if (src < 1841 || src > 2043) {
            throw new Error("연도 범위는 1841 ~ 2043 까지입니다.");
        }
        else
            return src;
    },
    Resut: function (lunaDate) {
        // 음력 데이터 (평달 - 작은달 :1,  큰달:2 )
        // (윤달이 있는 달 - 평달이 작고 윤달도 작으면 :3 , 평달이 작고 윤달이 크면 : 4)
        // (윤달이 있는 달 - 평달이 크고 윤달이 작으면 :5,  평달과 윤달이 모두 크면 : 6)
        var kk = [
            [1, 2, 4, 1, 1, 2, 1, 2, 1, 2, 2, 1] /* 1841 */,
            [2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1],
            [2, 2, 2, 1, 2, 1, 4, 1, 2, 1, 2, 1],
            [2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 5, 2, 1, 2, 2, 1, 2, 1],
            [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
            [2, 1, 2, 3, 2, 1, 2, 1, 2, 1, 2, 2],
            [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
            [2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 5, 2] /* 1851 */,
            [2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2],
            [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2],
            [1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
            [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
            [1, 2, 1, 1, 5, 2, 1, 2, 1, 2, 2, 2],
            [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
            [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
            [2, 1, 6, 1, 1, 2, 1, 1, 2, 1, 2, 2],
            [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2] /* 1861 */,
            [2, 1, 2, 1, 2, 2, 1, 2, 2, 3, 1, 2],
            [1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
            [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
            [2, 1, 1, 2, 4, 1, 2, 2, 1, 2, 2, 1],
            [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
            [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
            [1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 1],
            [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 2, 2, 1, 2, 1, 2, 1, 1, 5, 2, 1],
            [2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2] /* 1871 */,
            [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
            [1, 1, 2, 1, 2, 4, 2, 1, 2, 2, 1, 2],
            [1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
            [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
            [2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1, 2],
            [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
            [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 2, 4, 2, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
            [1, 2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1] /* 1881 */,
            [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
            [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
            [2, 1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2],
            [2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
            [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
            [2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2],
            [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
            [1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2] /* 1891 */,
            [1, 1, 2, 1, 1, 5, 2, 2, 1, 2, 2, 2],
            [1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
            [2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2, 1],
            [2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
            [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
            [2, 1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1] /* 1901 */,
            [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
            [1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
            [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
            [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
            [1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
            [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
            [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
            [2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2] /* 1911 */,
            [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
            [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
            [2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
            [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
            [2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
            [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 5, 2, 2, 1, 2, 2],
            [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
            [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2] /* 1921 */,
            [2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
            [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
            [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
            [2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
            [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
            [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
            [1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
            [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
            [1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
            [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1] /* 1931 */,
            [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
            [1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
            [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
            [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
            [2, 1, 4, 1, 2, 1, 2, 1, 2, 2, 2, 1],
            [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
            [2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
            [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
            [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1] /* 1941 */,
            [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
            [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
            [1, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
            [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
            [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
            [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
            [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
            [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
            [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2] /* 1951 */,
            [1, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
            [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
            [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
            [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
            [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
            [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2] /* 1961 */,
            [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
            [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
            [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
            [2, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
            [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
            [1, 2, 2, 1, 2, 1, 5, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
            [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
            [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2] /* 1971 */,
            [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
            [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
            [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
            [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
            [2, 2, 1, 2, 1, 2, 1, 5, 2, 1, 1, 2],
            [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
            [2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
            [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
            [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
            [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2] /* 1981 */,
            [2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2, 2],
            [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
            [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
            [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
            [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
            [2, 1, 2, 2, 1, 5, 2, 2, 1, 2, 1, 2],
            [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
            [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
            [1, 2, 1, 1, 5, 1, 2, 1, 2, 2, 2, 2],
            [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2] /* 1991 */,
            [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
            [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
            [1, 2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
            [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
            [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
            [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
            [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
            [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
            [2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2] /* 2001 */,
            [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
            [1, 5, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2],
            [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
            [1, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
            [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
            [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
            [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
            [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
            [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 2011 */,
            [2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1],
            [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2],
            [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
            [2, 1, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
            [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
            [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
            [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1] /* 2021 */,
            [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
            [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
            [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
            [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
            [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
            [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
            [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
            [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1] /* 2031 */,
            [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 5, 2, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
            [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
            [2, 2, 1, 2, 1, 4, 1, 1, 2, 1, 2, 2],
            [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
            [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
            [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
            [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
            [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 2041 */,
            [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
        ];
        var input_day = lunaDate;
        var md = new Array(31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        var year = input_day.substring(0, 4);
        var month = input_day.substring(4, 6);
        var day = input_day.substring(6, 8);
        // 음력에서 양력으로 변환
        var lyear, leapyes;
        var syear, smonth, sday;
        var y1, y2, m1;
        var i, j;
        var td, y;
        lyear = this.get_year(year); // 년도 check
        y1 = lyear - 1841;
        m1 = month - 1;
        leapyes = 0;
        if (kk[y1][m1] > 2) {
            switch (kk[y1][m1]) {
                            }
            // }
        }
        td = 0;
        for (i = 0; i < y1; i++) {
            for (j = 0; j < 12; j++) {
                switch (kk[i][j]) {
                    case 1:
                        td = td + 29;
                        break;
                    case 2:
                        td = td + 30;
                        break;
                    case 3:
                        td = td + 58; // 29+29
                        break;
                    case 4:
                        td = td + 59; // 29+30
                        break;
                    case 5:
                        td = td + 59; // 30+29
                        break;
                    case 6:
                        td = td + 60; // 30+30
                        break;
                }
            }
        }
        for (j = 0; j < m1; j++) {
            switch (kk[y1][j]) {
                case 1:
                    td = td + 29;
                    break;
                case 2:
                    td = td + 30;
                    break;
                case 3:
                    td = td + 58; // 29+29
                    break;
                case 4:
                    td = td + 59; // 29+30
                    break;
                case 5:
                    td = td + 59; // 30+29
                    break;
                case 6:
                    td = td + 60; // 30+30
                    break;
            }
        }
        if (leapyes == 1) {
            switch (kk[y1][m1]) {
                case 3:
                case 4:
                    td = td + 29;
                    break;
                case 5:
                case 6:
                    td = td + 30;
                    break;
            }
        }
        td = td + parseFloat(day) + 22;
        // td : 1841 년 1 월 1 일 부터 원하는 날짜까지의 전체 날수의 합
        y1 = 1840;
        do {
            y1 = y1 + 1;
            if (y1 % 400 == 0 || (y1 % 100 != 0 && y1 % 4 == 0)) {
                y2 = 366;
            }
            else {
                y2 = 365;
            }
            if (td <= y2) {
                break;
            }
            else {
                td = td - y2;
            }
        } while (1);
        syear = y1;
        md[1] = parseInt(y2.toString()) - 337;
        m1 = 0;
        do {
            m1 = m1 + 1;
            if (td <= md[m1 - 1]) {
                break;
            }
            else {
                td = td - md[m1 - 1];
            }
        } while (1);
        smonth = parseInt(m1.toString());
        sday = parseInt(td.toString());
        y = parseInt("" + (syear - 1));
        td = y * 365 + y / 4 - y / 100 + y / 400;
        for (i = 0; i < smonth - 1; i++) {
            td = td + md[i];
        }
        // td = make_data(td) + sday;
        // w = td % 7;
        // i = (td + 4) % 10;
        // j = (td + 2) % 12;
        // k1 = (parseInt(lyear.toString()) + 6) % 10;
        // k2 = (parseInt(lyear.toString()) + 8) % 12;
        /*         document.write("<br><br><center>");
                  document.write("음력 ",gan[k1],jee[k2],"년 ",ddi[k2],"띠해 ",lyear," 년 ",lmonth," 월 ",lday," 일 ","(",gan[i],jee[j],")","<br>");
                  document.write("양력 ",syear," 년 ",smonth," 월 ",sday," 일 ",week[w],"요일");
                  document.write("<br><br><a href='#' onclick='history.go(-1);'>돌아 가기</a>");*/
        if (smonth < 10) {
            smonth = "0" + smonth;
        }
        if (sday < 10) {
            sday = "0" + sday;
        }
        //console.log(lunaDate+" => 양력 휴일 변환: "+smonth+"월"+sday+"일");
        return smonth + "" + sday;
    },
    // 오늘 날짜
    today: new Date(),
    // 한주의 요일
    weekArray: [
        {
            dayCode: 0,
            ko: "일",
            en: "SUN",
        },
        {
            dayCode: 1,
            ko: "월",
            en: "MON",
        },
        {
            dayCode: 2,
            ko: "화",
            en: "TUE",
        },
        {
            dayCode: 3,
            ko: "수",
            en: "WED",
        },
        {
            dayCode: 4,
            ko: "목",
            en: "THU",
        },
        {
            dayCode: 5,
            ko: "금",
            en: "FRI",
        },
        {
            dayCode: 6,
            ko: "토",
            en: "SAT",
        },
    ],
    monthArray: [
        {
            monthCode: 1,
            ko: "01월",
            en: "January",
        },
        {
            monthCode: 2,
            ko: "02월",
            en: "February",
        },
        {
            monthCode: 3,
            ko: "03월",
            en: "March",
        },
        {
            monthCode: 4,
            ko: "04월",
            en: "April",
        },
        {
            monthCode: 5,
            ko: "05월",
            en: "May",
        },
        {
            monthCode: 6,
            ko: "06월",
            en: "June",
        },
        {
            monthCode: 7,
            ko: "07월",
            en: "July",
        },
        {
            monthCode: 8,
            ko: "08월",
            en: "August",
        },
        {
            monthCode: 9,
            ko: "09월",
            en: "September",
        },
        {
            monthCode: 10,
            ko: "10월",
            en: "October",
        },
        {
            monthCode: 11,
            ko: "11월",
            en: "November",
        },
        {
            monthCode: 12,
            ko: "12월",
            en: "December",
        },
    ],
    // 오늘 달에 대해서 설정
    setToday: function (year, month) {
        this.today = new Date(Date.UTC(year, month - 1, 1));
    },
    // 현재 설정된 날짜 리턴
    getToday: function () {
        // return this.today;
        return this.buildCalendar();
    },
    // 이전달로 이동
    getPrevCalendar: function () {
        this.today = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate()));
        return this.buildCalendar();
    },
    // 다음달로 이동
    getNextCalendar: function () {
        // 다음달 현재 날짜로 이동
        this.today = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate()));
        return this.buildCalendar();
    },
    // 켈린더 그리기
    buildCalendar: function () {
        var _this = this;
        // 이번달 첫째 날
        var nMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1));
        // 해당 월의 마지막 날
        var lastDate = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0).getDate()));
        // 테이블 달력 배열
        var tblCalendar = [];
        // monthArray에서 요청 월에 대해서 필터한 obj 반환
        var res = this.monthArray.filter(function (item) { return item.monthCode === _this.today.getMonth() + 1; })[0];
        // 앞자리 0 체크 정규식
        var koReg = /^(0)+(.월)$/;
        // 년,월 출력
        var tblCalendarYM = {
            ko: this.isMonthSlice
                ? "" + (this.today.getFullYear() + "년 ") + (!!koReg.test(res.ko) ? "" + res.ko.replace(koReg, "$2") : res.ko)
                : this.today.getFullYear() + "년 " + res.ko,
            en: !this.isMonthSlice
                ? res.en + ", " + this.today.getFullYear()
                : res.en.slice(0, 3) + ", " + this.today.getFullYear(),
        };
        // 이달의 첫째날 요일
        var dayWeek = this.weekArray.filter(function (item) { return item.dayCode === nMonth.getDay(); })[0];
        // 년도
        var year = this.today.getFullYear();
        // 년도 비교용 이것이 연도와 같으면 굳이 휴일 갱신 필요 x
        var lastYear = 0;
        // year와
        var isSame = false;
        if (year == lastYear)
            isSame = true;
        // 공통 휴일
        var commonHoliday = [
            {
                date: "0101",
                ko: "신정",
                en: "new Year",
                isLunar: false,
            },
            {
                date: "0408",
                ko: "석가탄신일",
                en: "Buddha's Birthday",
                isLunar: true,
            },
            {
                date: "1225",
                ko: "크리스마스",
                en: "christmas",
                isLunar: false,
            },
        ];
        // 한국 휴일
        var koreanHoliday = [
            {
                date: "0101",
                ko: "설날",
                en: "",
                isLunar: true,
                isConnect: true,
            },
            {
                date: "0301",
                ko: "3.1절",
                en: "",
                isLunar: false,
            },
            {
                date: "0505",
                ko: "어린이날",
                en: "",
                isLunar: false,
            },
            {
                date: "0606",
                ko: "현충일",
                en: "",
                isLunar: false,
            },
            {
                date: "0815",
                ko: "광복절",
                en: "",
                isLunar: false,
            },
            {
                date: "0815",
                ko: "추석",
                en: "",
                isLunar: true,
                isConnect: true,
            },
            {
                date: "1003",
                ko: "개천절",
                en: "",
                isLunar: false,
            },
            {
                date: "1009",
                ko: "한글날",
                en: "",
                isLunar: false,
            },
        ];
        // 추가 휴일 및 대체 휴일
        var alternativeHolidays = [];
        // 한국으로 언어 설정되어있는 경우 koreanHoliday도 결합
        var holiday = this.lang === "ko"
            ? __spreadArrays(commonHoliday, koreanHoliday, alternativeHolidays) : __spreadArrays(commonHoliday, alternativeHolidays);
        // 기존에 달력이 있는경우 초기화
        if (tblCalendar.length > 0) {
            tblCalendar = [];
        }
        var array = [];
        // 결합된 holiday에서 전 후 쉬는경우가 있을 수 있으니.. isConnect변수로 분기쳐서 배열에 삽입
        holiday.map(function (item) {
            if (!!item.isConnect) {
                var connectArray = [
                    {
                        date: Number(item.date) - 1 == 100
                            ? "1231"
                            : "0" + (Number(item.date) - 1),
                        ko: "",
                        en: item.en,
                        isLunar: item.isLunar,
                        isConnect: item.isConnect,
                    },
                    __assign({}, item),
                    {
                        date: "0" + (Number(item.date) + 1),
                        ko: "",
                        en: item.en,
                        isLunar: item.isLunar,
                        isConnect: item.isConnect,
                    },
                ];
                return array.push.apply(array, connectArray);
            }
            else
                return array.push(item);
        });
        // array 변수를 holiday에 통으로 넣어준다.
        holiday = array;
        // 한번도 휴일이 갱신이 안되어있는 경우 예를들어 현재 202001인데 201912같이 해가 바뀌지 않으면 굳이 휴일 갱신필요 x
        if (!isSame) {
            var lunarIndexArray_1 = [];
            holiday.filter(function (item, idx) {
                if (!!item.isLunar) {
                    return lunarIndexArray_1.push(idx);
                }
            });
            holiday = holiday
                .map(function (item, idx) {
                _this.Resut(year - 1 + "" + holiday[idx].date);
                return lunarIndexArray_1.indexOf(idx) !== -1
                    ? __assign(__assign({}, item), { 
                        // 날짜가 1231인경우 작년의 날짜와 대조해서 비교...
                        date: holiday[idx].date !== "1231"
                            ? _this.Resut(year + "" + holiday[idx].date)
                            : _this.Resut(year -
                                1 +
                                "" +
                                (Number(holiday[idx].date) - 1).toString()) }) : item;
            })
                .sort(function (a, b) { return (a.date > b.date ? 1 : -1); }); // date별 오름차순
            // 한번 비교했으면 마지막으로 휴일 대입한 년도를 대입해준다.
            lastYear = this.today.getFullYear();
        }
        var result = {};
        // 일월화수목금토
        var str1 = [];
        // 일월화수목금토 배열 삽입
        this.weekArray.map(function (item) {
            return str1.push({ value: item[_this.lang], dayCode: item.dayCode });
        });
        // 현재 설정된 언어값을 기반으로 xxxx년 xx월 출력
        result["header"] = tblCalendarYM[this.lang];
        // 일월화수목금토와 dayCode같이 배열에 넣기
        tblCalendar.push(str1);
        var thisMonth = lastDate.getMonth() + 1 >= 10
            ? "" + (lastDate.getMonth() + 1)
            : "0" + (lastDate.getMonth() + 1);
        var firstWeekArr = [];
        var index = 1;
        var _loop_1 = function (i) {
            if (i < dayWeek.dayCode) {
                firstWeekArr.push("");
            }
            else {
                var thisDay_1 = index >= 10 ? "" + index : "0" + index;
                if (holiday.findIndex(function (item) { return item.date === "" + thisMonth + thisDay_1; }) !== -1) {
                    firstWeekArr.push(__assign(__assign({ value: index++, dayCode: i }, holiday[holiday.findIndex(function (item) { return item.date === "" + thisMonth + thisDay_1; })]), { isHoliday: true }));
                }
                else {
                    firstWeekArr.push({
                        value: index++,
                        dayCode: i,
                        isHoliday: false,
                    });
                }
            }
        };
        for (var i = 0; i < 7; i++) {
            _loop_1(i);
        }
        tblCalendar.push(firstWeekArr);
        var cnt = 0;
        var array2 = [];
        var _loop_2 = function () {
            // 현재 날짜 파싱
            var thisDay = index >= 10 ? "" + index : "0" + index;
            if (index <= lastDate.getDate()) {
                // 위에서 생성한 휴일 배열의 인덱스 값 찾아서 값 리턴
                if (holiday.findIndex(function (item) { return item.date === "" + thisMonth + thisDay; }) !== -1) {
                    array2.push(__assign(__assign({ value: index++, dayCode: cnt }, holiday[holiday.findIndex(function (item) { return item.date === "" + thisMonth + thisDay; })]), { isHoliday: true }));
                }
                else {
                    array2.push({ value: index, dayCode: cnt, isHoliday: false });
                }
            }
            else {
                array2.push("");
            }
            cnt += 1;
            index++;
            // 7일이 되면 다음 배열로 생성해서 넣어준다. 2차원배열
            if (cnt === 7) {
                if (array2.filter(function (item) { return item !== ""; }).length > 0)
                    tblCalendar.push(array2);
                array2 = [];
                cnt = 0;
            }
        };
        // 간혹 7주가되는것이 있어서 이렇게 처리함.. 201906월 같은
        while (index < 42) {
            _loop_2();
        }
        index = 1;
        result["calendar"] = tblCalendar;
        // console.log(result);
        return result;
    },
};

exports.default = calendar;
//# sourceMappingURL=index.js.map
