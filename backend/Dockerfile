## builder
FROM golang:alpine as builder

RUN apk update && apk add --no-cache git
WORKDIR $GOPATH/src/mypackage/app/
COPY . .

RUN go get
RUN CGO_ENABLED=0 go build -o /go/bin/Pequod


## runner
FROM scratch

COPY --from=builder /go/bin/Pequod /go/bin/Pequod
COPY ./build /go/bin/build
WORKDIR /go/bin/
ENV DOCKER_HOST="unix:///var/run/docker.sock"
ENTRYPOINT ["/go/bin/Pequod"]
