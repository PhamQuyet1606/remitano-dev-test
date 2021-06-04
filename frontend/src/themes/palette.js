const palette = {
    light: {
        type: 'light',
        primary: {
            main: '#b3294e',
        },
        secondary: {
            main: '#90caf9',
        },
        warning: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00'
        },
        tonalOffset: 0.2,
        background: {
            default: '#f5f5f5'
        },
        common: {
            black: '#343a40',
            darkBlack: 'rgb(36, 40, 44)'
        },
        spacing: 8,
        breakpoints: {
            values: {
                xl: 1920,
                lg: 1280,
                md: 960,
                sm: 600,
                xs: 0
            }
        },
        border: {
            borderColor: 'rgba(0, 0, 0, 0.13)',
            borderWidth: 2
        },
        typography: {
            useNextVariants: true
        }
    }
};

export default palette;