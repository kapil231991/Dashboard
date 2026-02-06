export enum MilestoneStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum Month {
    JAN = 'JAN',
    FEB = 'FEB',
    MAR = 'MAR',
    APR = 'APR',
    MAY = 'MAY',
    JUN = 'JUN',
    JUL = 'JUL',
    AUG = 'AUG',
    SEP = 'SEP',
    OCT = 'OCT',
    NOV = 'NOV',
    DEC = 'DEC'
}

export const MILESTONE_STATUSES = [
    { label: 'Active', value: MilestoneStatus.ACTIVE },
    { label: 'Completed', value: MilestoneStatus.COMPLETED },
    { label: 'Cancelled', value: MilestoneStatus.CANCELLED }
];

export const MONTHS = [
    { label: 'January', value: Month.JAN },
    { label: 'February', value: Month.FEB },
    { label: 'March', value: Month.MAR },
    { label: 'April', value: Month.APR },
    { label: 'May', value: Month.MAY },
    { label: 'June', value: Month.JUN },
    { label: 'July', value: Month.JUL },
    { label: 'August', value: Month.AUG },
    { label: 'September', value: Month.SEP },
    { label: 'October', value: Month.OCT },
    { label: 'November', value: Month.NOV },
    { label: 'December', value: Month.DEC }
];
