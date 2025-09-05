const MODULE_NAME = {
    auth: 'AUTH' , 
    user:'USER' , 
    course:'COURSE'
} as const

export type ModuleNameType = typeof MODULE_NAME[keyof typeof MODULE_NAME]