import { formiInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input
                {...otherProps}
            />
            {label &&
                <formiInputLabel 
                shrink = {otherProps.value.length}
                >{label}</formiInputLabel>
            }
        </Group>
    )
}

export default FormInput;