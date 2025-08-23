export function ramdom(len:number){
    let options = "cnjsncjoeoeuwriywury8732t85u824y5uijfkdcndsmndmsncklajfihjugh39824yr942y5724857824"
    let ans = ""
    let length = options.length

    for (let i = 0; i < len; i++) {
        
        ans += options[Math.floor((Math.random() * length))]
        
    }
console.log(ans);

    return ans
}