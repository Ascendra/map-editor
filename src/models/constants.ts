export const constants = {
    GRID_SIZE: 8,
    PADDING_SIZE: 25,
    MAP_FORMAT_VERSION: 1,
    HIGHLIGHT_COLOR: getComputedStyle(document.documentElement)
        .getPropertyValue("--highlight-color")
} as const;
