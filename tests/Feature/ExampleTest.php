<?php

test('returns a successful response', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
});

test('home page renders the home component for guests', function () {
    $response = $this->get(route('home'));

    $response->assertInertia(
        fn ($page) => $page
            ->component('home')
            ->has('auth')
    );
});
