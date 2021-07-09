## ruilder
FROM golang:alpine as builder

RUN apk update && apk add --no-cache git
WORKDIR $GOPATH/src/mypackage/app/
COPY . .

RUN go get
RUN go build -o /go/bin/Pequod

ENV DOCKER_HOST="unix:///var/run/docker.sock"
ENTRYPOINT [ "/go/bin/Pequod" ]


## runner
FROM scratch

COPY --from=builder /go/bin/Pequod /go/bin/Pequod
RUN ls /go/bin
ENTRYPOINT ["/go/bin/Pequod"]
