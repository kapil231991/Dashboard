export type GoalHorizon = 'ONE_MONTH' | 'THREE_MONTHS' | 'SIX_MONTHS' | 'ONE_YEAR' | 'THREE_YEARS' | 'FIVE_YEARS' | 'TEN_YEARS';

export type GoalCategory = 'CAREER' | 'FINANCIAL' | 'HEALTH' | 'PERSONAL' | 'EDUCATION' | 'RELATIONSHIP' | 'SPIRITUAL' | 'OTHER';

export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';

export const GOAL_HORIZONS: { label: string; value: GoalHorizon }[] = [
    { label: '1 Month', value: 'ONE_MONTH' },
    { label: '3 Months', value: 'THREE_MONTHS' },
    { label: '6 Months', value: 'SIX_MONTHS' },
    { label: '1 Year', value: 'ONE_YEAR' },
    { label: '3 Years', value: 'THREE_YEARS' },
    { label: '5 Years', value: 'FIVE_YEARS' },
    { label: '10 Years', value: 'TEN_YEARS' }
];

export const GOAL_CATEGORIES: { label: string; value: GoalCategory }[] = [
    { label: 'Career', value: 'CAREER' },
    { label: 'Financial', value: 'FINANCIAL' },
    { label: 'Health', value: 'HEALTH' },
    { label: 'Personal', value: 'PERSONAL' },
    { label: 'Education', value: 'EDUCATION' },
    { label: 'Relationship', value: 'RELATIONSHIP' },
    { label: 'Spiritual', value: 'SPIRITUAL' },
    { label: 'Other', value: 'OTHER' }
];

export const GOAL_STATUSES: { label: string; value: GoalStatus }[] = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'On Hold', value: 'ON_HOLD' },
    { label: 'Cancelled', value: 'CANCELLED' }
];
