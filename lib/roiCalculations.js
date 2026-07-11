const WEEKS_PER_MONTH = 4.33
const WEEKS_PER_YEAR = 51.96

export const currency = (n) =>
  (Number.isFinite(n) ? n : 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

/**
 * Same ROI engine used on automationslimited.com/roi-calculator, ported here
 * so the numbers a prospect sees match wherever they land.
 */
export function computeRoi({ hours, people, hourlyRate, efficiency, projectFee, maintenance }) {
  const h = Number(hours) || 0
  const p = Number(people) || 0
  const rate = Number(hourlyRate) || 0
  const eff = (Number(efficiency) || 0) / 100
  const fee = Number(projectFee) || 0
  const maint = Number(maintenance) || 0

  const weeklyCost = h * p * rate
  const monthlyCost = weeklyCost * WEEKS_PER_MONTH
  const annualCost = weeklyCost * WEEKS_PER_YEAR

  const hoursSavedPerWeek = h * eff
  const monthlySavings = monthlyCost * eff
  const annualSavings = annualCost * eff

  const annualMaintenance = maint * 12
  const totalInvestment = fee + annualMaintenance

  const netYear1Savings = annualSavings - totalInvestment
  const roiMultiple = totalInvestment > 0 ? annualSavings / totalInvestment : 0
  const paybackMonths = monthlySavings > 0 ? totalInvestment / monthlySavings : 0

  // Guarantee threshold: 60% of calculated weekly hours saved, so it can be
  // committed to on a call without risk of missing it.
  const guaranteeHoursPerMonth = hoursSavedPerWeek * 0.6 * WEEKS_PER_MONTH / 4.33

  return {
    weeklyCost,
    monthlyCost,
    annualCost,
    hoursSavedPerWeek,
    monthlySavings,
    annualSavings,
    totalInvestment,
    netYear1Savings,
    roiMultiple,
    paybackMonths,
    guaranteeHoursPerMonth,
  }
}

export const ASSUMED_AUTOMATION_EFFICIENCY = 60
