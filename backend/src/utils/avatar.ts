export const Avatar=(name:string,gender:string)=>{
    let profilePic="https://avatar.iran.liara.run/public/";
    switch(gender){
        case "male":
            profilePic=`https://avatar.iran.liara.run/public/boy?username=${name}`;
            break;
        case "female":
            profilePic=`https://avatar.iran.liara.run/public/girl?username=${name}`;
            break;
        default:
            profilePic=`https://avatar.iran.liara.run/public`;
    }
    return profilePic;
}