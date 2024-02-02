describe('parseInt', () => {

    it('success number', () => {
        const result = parseInt('1');

        expect(result).toBe(1);
    });

    it('success binary', () => {
        const result = parseInt('101', 2);

        expect(result).toBe(5);
    });
});