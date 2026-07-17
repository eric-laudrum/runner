import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
    const scheme = useColorScheme();

    // If scheme is null or undefined, default to 'light'
    const theme = scheme ?? 'light';

    return Colors[theme];
}