Shows how to delegate catch() behavior of q library to a function that calls done(err).

Uses node convention and allows proper exception to be reported plus a proper stacktrace leading to the failing spec.

RUN: node --harmony