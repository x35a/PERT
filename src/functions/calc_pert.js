export default (rows) => {
    const input_key = {
        min: 'min',
        guess: 'guess',
        max: 'max'
    }

    const math_expectations_array = rows.map(row => {
        const min = row.inputs.find(input => input.key === input_key.min)
        const guess = row.inputs.find(input => input.key === input_key.guess)
        const max = row.inputs.find(input => input.key === input_key.max)
        return (parseFloat(min.value) + parseFloat(4 * guess.value) + parseFloat(max.value)) / 6
    })

    let pert_result = math_expectations_array.reduce((accumulator, value) => accumulator + value, 0)
    pert_result = pert_result.toFixed(1)
    return pert_result
}