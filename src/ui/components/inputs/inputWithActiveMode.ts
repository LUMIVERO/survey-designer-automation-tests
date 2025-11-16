import { InputWithPlaceholder } from "@ui/components/inputs/inputWithPlaceholder";

export class InputWithActiveMode extends InputWithPlaceholder {

	protected input = this.page.getByLabel("Div edit mode");
}
