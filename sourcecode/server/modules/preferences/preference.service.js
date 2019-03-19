const preferenceDbAction = require('./preference.dbaction');

 async function createPreferences(user_id, data) {
     var data = data.data;
     // var ideaPreferences, advisorPreference, profilePreference, pushNotification, emailNotification, smsNotification;
    // ({ideaPreferences, advisorPreference, profilePreference, pushNotification, emailNotification, smsNotification}= data.data)
    switch(! data.checked ||  data.checked) {
        
       case data.name ==  'ideaPreference':
        return  preferenceDbAction.createPreferences(user_id,data.checked, null, null, null, null, null);

        case data.name === 'advisorPreference': 
        return  preferenceDbAction.createPreferences(user_id,null, data.checked, null, null, null, null);
       
        case data.name === 'profilePreference': 
        return  preferenceDbAction.createPreferences(user_id,null, null,data.checked, null, null, null);
        
        case data.name === 'pushNotification': 
        return  preferenceDbAction.createPreferences(user_id,null, null, null, data.checked, null, null);
        
        case data.name === 'emailPushNotification': 
        return  preferenceDbAction.createPreferences(user_id,null, null, null, null, data.checked, null);
        
        case data.name === 'smsNotification':
        return  preferenceDbAction.createPreferences(user_id,null, null, null, null, null, data.checked);
    }   
}

 async function getPreferences(user_id) {
   return await  preferenceDbAction.getPreferences(user_id);
}

 function updatePreferences() {
    return preferenceDbAction.updatePreferences();
}

module.exports = {
    createPreferences,
    getPreferences,
    updatePreferences
};