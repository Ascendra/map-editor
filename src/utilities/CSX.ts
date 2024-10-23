type ClassListDefinition = Record<string, boolean>;

export const CSX = (classListDefinition: ClassListDefinition): string => {
    const classNames = Object.entries(classListDefinition)
        .reduce<string[]>(
            (classList, [className, condition]) => {
                if (condition) {
                    classList.push(className);
                }

                return classList;
            },
            []
        )
        .join(" ");

    return classNames;
};
