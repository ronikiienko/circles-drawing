export const ConditionalPanel = ({active, children}) => {
    if (!active) return null;
    return <>{children}</>;
};