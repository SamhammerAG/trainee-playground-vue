export interface ErrorInfoContract {
    errorCode: ErrorCode;
    fieldName?: string;
}

export enum ErrorCode {
    Unknown = "Unknown",
    ChatIdInvalid = "ChatIdInvalid",
    FileIdInvalid = "FileIdInvalid",
    TextIsNull = "TextIsNull",
    IsOwnChat = "IsOwnChat",
    NotParticipantOfChat = "NotParticipantOfChat",
    UserIsNoParticipantOfChat = "UserIsNoParticipantOfChat",
    ChatAlreadyAssigned = "ChatAlreadyAssigned",
    NotAssignedToChat = "NotAssignedToChat",
    CultureIsRequired = "CultureIsRequired",
    CultureNameIsInvalid = "CultureNameIsInvalid",
    ChatNotActive = "ChatNotActive",
    ChatNotInPool = "ChatNotInPool",
    ChatAlreadyInPool = "ChatAlreadyInPool",
    UtteranceAlreadyUpdated = "UtteranceAlreadyUpdated",
    IsSameChatLanguage = "IsSameChatLanguage",
    CustomerNotFound = "CustomerNotFound",
    DescriptionIsMandatory = "DescriptionIsMandatory",
    CustomerCreationFailed = "CustomerCreationFailed",
    ResultAlreadyUpdated = "ResultAlreadyUpdated",
    UtteranceAlreadyExists = "UtteranceAlreadyExists",
    ChoiceEmpty = "ChoiceEmpty",
    TrainingInProgress = "TrainingInProgress",
    TrainingError = "TrainingError",
    LanguageNotSupported = "LanguageNotSupported",
    IntentAlreadyExists = "IntentAlreadyExists",
    IncorrectIntentNameFormat = "IncorrectIntentNameFormat",
    IntentIsNotUnique = "IntentIsNotUnique",
    IncorrectUtteranceTextFormat = "IncorrectUtteranceTextFormat",
    HolidayEmpty = "HolidayEmpty",
    HolidayeAlreadyExists = "HolidayeAlreadyExists",
    StepTemplateIsAlreadyExisting = "StepTemplateIsAlreadyExisting",
    StepTemplateStillInUse = "StepTemplateStillInUse",
    NotAllStepsConnected = "NotAllStepsConnected",
    CyclesFound = "CyclesFound"
}
