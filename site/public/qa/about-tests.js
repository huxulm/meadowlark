suit('"About page  tests"', function () {
    test('page should contain link to contack page', function () {
        assert($('a=[href="/contack"] ').lenght);
    });
});