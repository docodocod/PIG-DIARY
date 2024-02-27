// 얼마전 변환 메서드
exports.timeForToday=(value)=>{
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

//년 월 일 변환 메서드
exports.formatDate=(dateString)=>{
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();

    // 월과 일이 한 자리 수인 경우 앞에 0을 붙여 두 자리로 만듭니다.
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}년 ${formattedMonth}월 ${formattedDay}일`;
}

//시 분 변환 메서드
exports.formatDateWithTime=(dateString)=>{
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if((formattedHours-12)>0){
        const formatTime=formattedHours-12;
        return `오후 ${formatTime}시 ${formattedMinutes}분`;
    }else{
        return `오전 ${formattedHours}시 ${formattedMinutes}분`;
    }
}