// 'use strict';

// class ValidateUtil {
// constructor(validateEmail, validatePassword, validatePhone) {
//     this.validateEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 형식;
//     this.validatePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,10}/gs; // 숫자, 영어 대소문자, 특수문자 각 1글자 이상 포함, 5~10글자, 글자 중간 공백 불가;
//     this.validatePhone = /^\d{2,3}-\d{3,4}-\d{4}$/; // 2~3자리 숫자 - 3~4자리 숫자 - 4자리 숫자;

//     if (customerInfo.email.search(validateEmail) === -1) {
//         return { code: 400, message: '이메일이 작성 형식과 맞지 않습니다.' };
//     }
//     if (!validatePassword.test(customerInfo.password)) {
//         return { code: 400, message: '비밀번호가 작성 형식과 맞지 않습니다.' };
//     }
//     if (!validatePhone.test(customerInfo.phone)) {
//         return { code: 400, message: '연락처가 작성 형식과 맞지 않습니다.' };
//     }
//     if (!customerInfo.nickname) {
//         return { code: 400, message: '닉네임이 입력되지 않았습니다.' };
//     }
//     const duplicateCustomerEmail = await this.findCustomerByEmail(customerInfo.email);
//     if (duplicateCustomerEmail) {
//         return { code: 401, message: '이미 중복되는 이메일 계정이 있습니다' };
//     }
//     const duplicateCustomerNickname = await this.findCustomerByNickname(customerInfo.nickname);
//     if (duplicateCustomerNickname) {
//         return { code: 401, message: '이미 중복되는 닉네임이 있습니다' };}

//     }

// module.exports = ValidateUtil;
