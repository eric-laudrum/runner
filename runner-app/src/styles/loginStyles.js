import { StyleSheet } from 'react-native';
import { colors, spacing } from './theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: spacing.xl,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.xl,
        textAlign: 'center',
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
        fontSize: 16,
        color: colors.textMain,
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    buttonText: {
        color: colors.surface,
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: colors.danger,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    linkText: {
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.lg,
    }
});