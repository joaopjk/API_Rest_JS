import handlebars from "handlebars";

interface ITemplateVariable {
    [key: string]: any
}

interface IParseMailTemplate {
    template: string;
    variables: ITemplateVariable;
}

export class HandleBarsMailTemplate {
    public async parse({ template, variables }: IParseMailTemplate): Promise<string> {
        const parseTemplate = handlebars.compile(template);
        return parseTemplate(variables);
    }
}