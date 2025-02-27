

function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            if(obj[p]!="-"){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        let prefix = "";
    if(str.length>0)
    {
        prefix="?";
    }
    return prefix+(str.join("&"));
    }

function canMarkQuestion(testSection,questionIndex){
    if(testSection.section_type=="compulsory" || testSection.section_type=="optional-neet"){
        return true;
    }
    else{
        if(testSection.markedQuestions.includes(questionIndex)){
            return true;
        }
        else{
            if(testSection.markedQuestions.length==testSection.numberCompulsoryQuestions){
                return false;
            }
            else{
                testSection.markedQuestions.push(questionIndex);
                return true;
            }
        } 
    }
}
export default {serialize,canMarkQuestion};