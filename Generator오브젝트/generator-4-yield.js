/*
-----------------------------------------------
yield: 제너레이터 함수 실행,멈춤
-----------------------------------------------
[구문]
    [returnValue] = yield [expression]

    ==> yield 키워드의 오른쪽 표현식(expression)은 선택으로 표현식을 작성하면,
    ==> 이를 평가하여, 표현식 평가결과를 왼쪽의 [returenValue]에 할당하지 않는다. (next(param) 호출시 param 값이 설정됨.)
    ==> 제너레이터 오브젝트의 next()를 호출하면 next() 파라미터 값이 [returnValue]에 설정된다.
    ==> next() 호출시 리턴값은 {value:값, done:true/false} 이다. 
    ==> 또는, 
    ==> value 프로퍼티 값과, done 프로퍼티 값을 설정하는 방법도 있다.
*/

function* genFunction(param){
    let rValue = yield param * 10;

    console.log('rValue :: ',rValue); 
    let sum = yield param + rValue;

    console.log('sum :: ',sum); 
    yield sum + param;
}

let genObj = genFunction(10); //param에 10이 설정된 제너레이터 오브젝트생성



console.log(genObj.next()); 
//------------------------------------------
//첫번째 next()호출 ==> 첫번째 yield 지점까지 실행 
//------------------------------------------
// let rValue = yield param * 10; ==> 이부분 실행
// param 은 제너레이터 함수의 파라미터로 제너레이터 오브젝트를 생성했을때 10으로 설정
// yield가 평가결과를 {value : 100, done:false} 형태로 리턴.
// rValue에 yield 평가결과를 할당하지 않음.
/* 출력 :
    { value: 100, done: false }
*/



console.log(genObj.next(1));
//------------------------------------------
//두번째 next()호출 ==> 두번째 yield 지점까지 실행 
/*  
    console.log('rValue :: ',rValue); 
    let sum = yield param + rValue;
*/
//------------------------------------------
// ==> next(1)를 호출하면, 파라미터 값(1)을 rValue 에 설정한 후 두번째 함수블록 실행
// ==> yield 평가결과를 {value:11 ,done:false} 형태로 리턴.
// ==> 왼쪽의 sum 변수에 yield 평가결과를 할당하지 않음.
/* 출력 :
    rValue ::  1
    { value: 11, done: false }
*/


console.log(genObj.next(20));
//------------------------------------------
//세번째 next()호출 ==> 세번째 yield 지점까지 실행 
/*  
    console.log('sum :: ',sum); 
    yield sum + param;
*/
//------------------------------------------
// ==> next(20) 으로 호출하면, 파라미터 값 20이 let sum = yield param + rValue; 에서 sum 에 할당됨.
// 그리고, 세번째 함수블록 실행 (sum + param) 
// {value:30,done:false} 형태로 리턴.




console.log(genObj.next());

/*출력 
{ value: undefined, done: true }
*/





console.log('==============================')
function* genFunc2 (param){
    yield param  + param ;
    let check = 10;
};

let genObj2 = genFunc2(200); // ==> 호출하면, param 에 200이 설정되어, 제너레이터 오브젝트가 생성된다.
console.log(genObj2.next()); // ==> 호출하면, 첫 yield 표현식 까지 수행 ( yield param  + param ; ) 
// ==> param은 제너레이터 오브젝트 생성시 200으로 설정, 
// ==> yield 가 평가결과를 리턴하므로, {value : 400, done: false} 로 리턴함.
// ==> done 프로퍼티 값이 true/false 를 설정한다.
// ==> yield 표현식 결과를 리턴하는 시점은 이터레이터가 끝나지 않은 시점이므로 false 설정.
// ==> 다음에 처리할 yield 가 없지만, 현시점에서는 다음을 체크하지 않고, 현시점의 상태만 체크하여, done 프로퍼티에 false 설정.
/*출력 : { value: 400, done: false } */

console.log(genObj2.next());
// ==> next() 를 호출하면, 파라미터 값을 바로 앞 yield 왼쪽의 변수에 할당하는데 , 여기서는 변수가 없으므로, 할당하지 않음.
// ==> 다음코드 실행. let check = 10;
// ==> 더이상 수행할 yield가 없으며, 함수에 처리할 코드도 없다. 리턴할 값이 없으므로, 
// ==> value 프로퍼티에 undefined ,done 프로퍼티에 true 설정 
// ==> 이터레이터 종료 체크시 value 는 undefined가 올 수 있으므로, done 으로 체크해야 한다.
/*출력 : { value: undefined, done: true } */




