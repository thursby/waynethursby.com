---
title: Life Without PHP Day 3
date: 2019-03-22T04:35:49.932Z
summary: >-
  Although the withdrawal effects are minimal, and the trip has been speedy and
  colorful, I can see the silos on the horizon.
tags:
  - post
  - ramblings
  - tech
---
The high was quick and sudden, just like they said it would be. That first hit of watching a static site build in milliseconds was something that was at once surprising but also felt like it had always been there.

At the start of our journey it allowed us to make good time. We covered a lot of ground with minimal effort, and only occasional stops to refill the fuel tank.

But after covering who-knows-how-many miles, out on the open highway, we can see for miles in any direction. The possibilities are at once limitless but also extremely barren. While so far this platform has given me everything I want, just the knowledge that I "can't" have certain features seems to have a certain weight.

## Forbidden Fruit
Even though I don't want comments, the knowledge that this would be hard to achieve almost makes me want it. Similarly, I know I would start running into cross-site scripting issues if I started using JavaScript to do clever things with external resources.

Off in the distance one solution looms large. We can see the hulking silhouettes of silos in the distance. Those silos are more than enough to hold your data, but what happens when you want to move? What happens when the silos collapse?

In the other direction is innovation, but of course that view is obscured. What exactly would a workable JAMstack infrastructure look like? The concept of storing data in files as opposed to databases is not new, and neither is a static site generator.

## What's missing

One clear omission in [Netlify CMS](https://www.netlifycms.com) is the ability to save drafts. Even if it were manual, it seems like the ability would require a lot more transactions with the underlying repository, further treating it like a transactional database when its intended function is to manage code.

Even if this isn't a real issue for this use case (it probably isn't) it does bring up the fact that eventually you can't save-and-rebuild after every action. It's not practical and not even really required.

## So fix it

One possible solution is to use local storage for administrative data like drafts. While this approach wouldn't work for any data that is intended to be shared, it would at least provide the ability to save data locally for quick recall on a user level. This user data could then optionally be sync'd in some way -- either in the repo itself or some other mechanism -- to provide similar mechanisms for non-critical data.
