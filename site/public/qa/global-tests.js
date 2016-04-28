suit('Global Tests', function () {
    test('page has a valid title!', function () {
        assert(document.title && document.title.match(/\s/g) && document.title.toUpperCase() !== 'TODO');
    });
});